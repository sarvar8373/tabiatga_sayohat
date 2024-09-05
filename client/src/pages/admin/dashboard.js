// src/pages/admin/dashboard.js
import React from "react";
import "../../api/css/sidebar.css";
import "../../api/css/sb-admin-2.css";
import Sidebar from "./dashboard/sidebar";
import Navbar from "./dashboard/navbar";
import { Routes, Route } from "react-router-dom";
import Adobe from "./pages/abode/adobe";
import AdobeList from "./pages/abode/adobeList";
import UsersList from "./pages/users/usersList";
import UserAdd from "./pages/users/userAdd";
import Profile from "./pages/profile";
import Category from "./pages/category/category";
import Posts from "./pages/posts/posts";
import HomeAll from "./homeAll";
import Organization from "./pages/organization/organizatioin";
import Order from "./pages/order/order";
import AddPosts from "./pages/posts/addPosts";
import OrganizationAdd from "./pages/organization/organizationAdd";
import OrganizationList from "./pages/organization/organizationList";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ProtectedRoute from "../../context/ProtectedRoute";
import Notification from "./pages/notification/notification";

export default function Dashboard() {
  return (
    <div id="page-top">
      <HelmetProvider>
        <Helmet>
          <title>Admin Panel</title>
        </Helmet>
      </HelmetProvider>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomeAll />} />
              {/* <Route
                path="/organization"
                element={
                  <ProtectedRoute
                    requiredRole={["user"]}
                    element={<Organization />}
                  />
                }
              /> */}
              <Route
                path="/organization-add"
                element={
                  <ProtectedRoute
                    requiredRole={["admin", "user"]}
                    element={<OrganizationAdd />}
                  />
                }
              />
              <Route path="/notification" element={<Notification />} />
              <Route
                path="/organization-list"
                element={
                  <ProtectedRoute
                    requiredRole={["admin", "region", "district", "user"]}
                    element={<OrganizationList />}
                  />
                }
              />
              <Route
                path="/post-add"
                element={
                  <ProtectedRoute
                    requiredRole={["admin"]}
                    element={<AddPosts />}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/adobe"
                element={
                  <ProtectedRoute
                    requiredRole={["admin", "user", "region", "district"]}
                    element={<Adobe />}
                  />
                }
              />
              <Route
                path="/adobe-list"
                element={
                  <ProtectedRoute
                    requiredRole={["admin", "user", "region", "district"]}
                    element={<AdobeList />}
                  />
                }
              />
              <Route path="/order" element={<Order />} />
              <Route
                path="/user-add"
                element={
                  <ProtectedRoute
                    requiredRole={["admin"]}
                    element={<UserAdd />}
                  />
                }
              />
              <Route
                path="/users-list"
                element={
                  <ProtectedRoute
                    requiredRole={["admin", "region", "district"]}
                    element={<UsersList />}
                  />
                }
              />
              <Route
                path="/category"
                element={
                  <ProtectedRoute
                    requiredRole={["admin"]}
                    element={<Category />}
                  />
                }
              />
              <Route
                path="/posts"
                element={
                  <ProtectedRoute
                    requiredRole={["admin"]}
                    element={<Posts />}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
