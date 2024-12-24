import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/atoms";
import { RoutePaths } from "../enums/RoutePaths";

const PrivateRoute: React.FC = () => {
  const user = useAtomValue(userAtom);

  return user ? <Outlet /> : <Navigate to={"/auth" + RoutePaths.LOGIN} />;
};

export default PrivateRoute;
