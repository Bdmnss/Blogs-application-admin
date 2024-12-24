import { useMutation } from "@tanstack/react-query";
import { logout, login } from "@/supabase/auth";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/enums/RoutePaths";

export const useLogout = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("user");
      setUser(null);
      navigate(RoutePaths.LOGIN);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

export const useLogin = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const user = data.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate(RoutePaths.DASHBOARD);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};