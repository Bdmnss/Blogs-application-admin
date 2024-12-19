import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";
import dayjs from "dayjs";
import { blogColumns } from "./BlogColumns";
import { Blog } from "./types";

const BlogsTable: React.FC = () => {
  const navigate = useNavigate();

  const { data: blogs } = useQuery({
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

  const handleAdd = () => {
    navigate("/blogs/add");
  };

  const handleEdit = (record: Blog) => {
    navigate(`/blogs/edit/${record.id}`);
  };

  return (
    <>
      <EditableTable
        columns={blogColumns}
        data={blogs || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </>
  );
};

export default BlogsTable;
