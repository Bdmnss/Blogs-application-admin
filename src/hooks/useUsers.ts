import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { User } from "@/pages/UsersTable/types";
import dayjs from "dayjs";

export const useFetchUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw new Error(error.message);

      return data.users?.map((user) => ({
        id: user.id,
        full_name: user.user_metadata?.full_name || "none",
        username: user.user_metadata?.username || "none",
        email: user.email || "none",
        phone_number: user.user_metadata?.phone_number || "none",
        created_at: dayjs(user.created_at).format("YYYY-MM-DD HH:mm"),
        last_sign_in_at: dayjs(user.last_sign_in_at).format("YYYY-MM-DD HH:mm"),
        role: user.role || "none",
      })) || [];
    },
  });
};

export const useFetchUser = (id: string | undefined) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID is undefined");
      const { data, error } = await supabase.auth.admin.getUserById(id);
      if (error) throw new Error(error.message);
      return {
        id: data.user.id,
        full_name: data.user?.user_metadata?.full_name || "none",
        username: data.user?.user_metadata?.username || "none",
        email: data.user?.email || "none",
        phone_number: data.user?.user_metadata?.phone_number || "none",
        created_at: dayjs(data.user.created_at).format("YYYY-MM-DD HH:mm"),
        last_sign_in_at: dayjs(data.user.last_sign_in_at).format(
          "YYYY-MM-DD HH:mm"
        ),
        role: data.user.role || "none",
      } as User;
    },
  });
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUser: User & { password: string }) => {
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        user_metadata: {
          full_name: newUser.full_name,
          username: newUser.username,
          phone_number: newUser.phone_number,
        },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useEditUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      const { data, error } = await supabase.auth.admin.updateUserById(updatedUser.id, {
        email: updatedUser.email,
        user_metadata: {
          full_name: updatedUser.full_name,
          username: updatedUser.username,
          phone_number: updatedUser.phone_number,
        },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};