import React from "react";
import { useNavigate } from "react-router-dom";
import EditableTable from "@/components/EditableTable";
import { blogColumns } from "./BlogColumns";
import { useFetchBlogs } from "@/hooks/useBlogs";
import { Blog } from "./types";

const BlogsTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: blogs } = useFetchBlogs();

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
