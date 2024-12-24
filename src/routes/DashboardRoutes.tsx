import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import BlogsTable from "../pages/BlogsTable/BlogsTable";
import AddBlog from "../pages/BlogsTable/components/AddBlog";
import EditBlog from "../pages/BlogsTable/components/EditBlog";
import UsersTable from "../pages/UsersTable/UsersTable";
import AddUser from "../pages/UsersTable/components/AddUser";
import EditUser from "../pages/UsersTable/components/EditUser";
import PrivateRoute from "../guards/PrivateRoute";
import { RoutePaths } from "../enums/RoutePaths";

const DashboardRoutes: React.FC = () => (
  <Routes>
    <Route element={<PrivateRoute />}>
      <Route path={RoutePaths.DASHBOARD} element={<DashboardLayout />}>
        <Route index element={<div>Welcome to the Dashboard</div>} />
        <Route path={RoutePaths.BLOGS} element={<BlogsTable />} />
        <Route path={RoutePaths.ADD_BLOG} element={<AddBlog />} />
        <Route path={RoutePaths.EDIT_BLOG} element={<EditBlog />} />
        <Route path={RoutePaths.USERS} element={<UsersTable />} />
        <Route path={RoutePaths.ADD_USER} element={<AddUser />} />
        <Route path={RoutePaths.EDIT_USER} element={<EditUser />} />
      </Route>
    </Route>
  </Routes>
);

export default DashboardRoutes;
