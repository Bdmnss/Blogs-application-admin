import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { Blog } from "@/pages/BlogsTable/types";
import dayjs from "dayjs";

export const useFetchBlogs = () => {
  return useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) throw new Error(error.message);
      return data.map((blog: Blog) => ({
        ...blog,
        created_at: dayjs(blog.created_at).format("YYYY-MM-DD HH:mm"),
      }));
    },
  });
};

export const useFetchBlog = (id: string | undefined) => {
  return useQuery<Blog>({
    queryKey: ["blog", id],
    queryFn: async () => {
      if (!id) throw new Error("Blog ID is undefined");
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return {
        ...data,
        created_at: dayjs(data.created_at).format("YYYY-MM-DD HH:mm"),
      } as Blog;
    },
  });
};

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