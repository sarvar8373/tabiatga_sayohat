import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/admin/login";
import Dashboard from "./pages/admin/dashboard";
import Error from "./pages/404";
import Home from "./pages/home";
import Post from "./pages/post/post";
import { Contact } from "./pages/contact/contact";
import Register from "./pages/admin/register";
import Adventure from "./pages/adventure/adventure";
import Detail from "./pages/detail/detail";
import Ekosentr from "./pages/eko-sentr/ekoSentr";
import Directions from "./pages/directions/directions";
import About from "./pages/about/about";
import Embers from "./pages/embers/embers";
import SinglePost from "./pages/single-post/singlePost";
import Waterfalls from "./pages/waterfalls/waterfalls";
import Lakes from "./pages/lakes/lakes";
import Gorges from "./pages/gorges/gorges";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/unauthorized" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/embers" element={<Embers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Post />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/connection" element={<Contact />} />
        <Route path="/waterfalls" element={<Waterfalls />} />
        <Route path="/gorges" element={<Gorges />} />
        <Route path="/lakes" element={<Lakes />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/ecocenter" element={<Ekosentr />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/directions" element={<Directions />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
