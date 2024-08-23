import React, { useEffect, useState } from "react";
import Customers from "./pages/customer";
import Home from "./pages/home";
import Region from "./pages/region";
import District from "./pages/district";
import Bussiness from "./pages/bussiness";
import { getUserDetails } from "../../http/usersApi";

export default function HomeAll() {
  const [userDetails, setUserDetails] = useState("");
  useEffect(() => {
    getUserDetails()
      .then((result) => {
        if (result.data.Status) {
          setUserDetails(result.data);
          console.log(result.data);
        } else {
          console.error(result.data.Error);
          console.log(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(err);
        // Additional error handling if needed
      });
  }, []);
  return (
    <div>
      {" "}
      {userDetails.role === "admin" ? (
        <Home />
      ) : userDetails.role === "region" ? (
        <Region />
      ) : userDetails.role === "district" ? (
        <District />
      ) : userDetails.role === "user" ? (
        <Bussiness />
      ) : (
        <Customers />
      )}
    </div>
  );
}
