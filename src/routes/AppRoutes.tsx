import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/*" element={<DashboardRoutes />} />
    <Route path="/auth/*" element={<AuthRoutes />} />
  </Routes>
);

export default AppRoutes;
