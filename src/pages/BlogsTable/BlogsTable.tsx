import React from "react";
import { useNavigate } from "react-router-dom";
import EditableTable from "@/components/EditableTable";
import { blogColumns } from "./BlogColumns";
import { useFetchBlogs } from "@/hooks/useBlogs";
import { Blog } from "./types";
import { RoutePaths } from "@/routes/RoutePaths";

const BlogsTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: blogs } = useFetchBlogs();

  const handleAdd = () => {
    navigate(RoutePaths.ADD_BLOG);
  };

  const handleEdit = (record: Blog) => {
    navigate(RoutePaths.EDIT_USER.replace(":id", record.id.toString()));
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
