import React, { useState } from "react";
import { Modal } from "antd";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";
import dayjs from "dayjs";
import { useAddBlogMutation, useEditBlogMutation } from "./BlogMutations";
import { blogColumns } from "./BlogColumns";
import BlogForm from "./components/BlogForm";
import { Blog } from "./types";

const BlogsTable: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const addBlogMutation = useAddBlogMutation();
  const editBlogMutation = useEditBlogMutation();

  const handleAdd = () => {
    setEditingBlog(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Blog) => {
    setEditingBlog(record);
    setIsModalVisible(true);
  };

  const handleFinish = (values: {
    title_en: string;
    description_en: string;
  }) => {
    if (editingBlog) {
      editBlogMutation.mutate({
        ...editingBlog,
        title_en: values.title_en,
        description_en: values.description_en,
      });
    } else {
      const newBlog: Blog = {
        id: Date.now(),
        title_en: values.title_en,
        description_en: values.description_en,
        created_at: dayjs().format("YYYY-MM-DD HH:mm"),
      };
      addBlogMutation.mutate(newBlog);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <EditableTable
        columns={blogColumns}
        data={blogs || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
      <Modal
        title={editingBlog ? "Edit Blog" : "Add Blog"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <BlogForm
          initialValues={editingBlog || { title_en: "", description_en: "" }}
          onFinish={handleFinish}
          editingBlog={editingBlog}
        />
      </Modal>
    </>
  );
};

export default BlogsTable;
