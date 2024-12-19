import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { Blog } from "./BlogsTable";

export const useAddBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog: Blog) => {
      const { data, error } = await supabase.from("blogs").insert(newBlog);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useEditBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBlog: Blog) => {
      const { data, error } = await supabase
        .from("blogs")
        .update(updatedBlog)
        .eq("id", updatedBlog.id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};