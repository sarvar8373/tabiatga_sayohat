import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../api/host/host";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Check if the user is authenticated
        const checkResult = await axios.get(`${BASE_URL}/auth/check`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (checkResult.data.isAuthenticated) {
          // Fetch user details if authenticated
          const userResult = await axios.get(`${BASE_URL}/auth/user`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });

          if (userResult.data.Status) {
            setUserDetails(userResult.data);
            setIsAuthenticated(true);
            setError(""); // Clear any previous errors
          } else {
            setError(userResult.data.Error || "Failed to fetch user data");
            setUserDetails("");
            setIsAuthenticated(false);
          }
        } else {
          setError("Unauthorized: Please log in.");
          setUserDetails("");
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Handle 401 errors specifically
          setError("Unauthorized: Please log in.");
          setUserDetails("");
          setIsAuthenticated(false);
        } else {
          setError("Failed to fetch user data.");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  const login = async (phone_number, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        phone_number,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);

      const userResult = await axios.get(`${BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (userResult.data.Status) {
        setUserDetails(userResult.data);
        setError("");
      } else {
        setError(userResult.data.Error || "Failed to fetch user data");
        setUserDetails("");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUserDetails("");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
