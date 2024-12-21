import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Login from "../pages/Login/Login";
import RestrictedRoute from "../guards/RestrictedRoute";
import { RoutePaths } from "./RoutePaths";

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route element={<RestrictedRoute />}>
      <Route
        path={RoutePaths.LOGIN}
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
    </Route>
  </Routes>
);

export default AuthRoutes;
