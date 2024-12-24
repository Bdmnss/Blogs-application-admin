import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/atoms";
import { RoutePaths } from "../enums/RoutePaths";

const RestrictedRoute: React.FC = () => {
  const user = useAtomValue(userAtom);

  return user ? <Navigate to={RoutePaths.DASHBOARD} /> : <Outlet />;
};

export default RestrictedRoute;
