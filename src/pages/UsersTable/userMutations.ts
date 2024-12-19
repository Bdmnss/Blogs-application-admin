import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { User } from "./types";

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