import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/atoms";

const RestrictedRoute: React.FC = () => {
  const user = useAtomValue(userAtom);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default RestrictedRoute;
