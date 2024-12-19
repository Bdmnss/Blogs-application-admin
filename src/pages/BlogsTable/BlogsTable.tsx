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
      return data.map((blog: Blog) => ({
        ...blog,
        created_at: dayjs(blog.created_at).format("YYYY-MM-DD HH:mm"),
      }));
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
    title_ka: string;
    description_en: string;
    description_ka: string;
  }) => {
    if (editingBlog) {
      editBlogMutation.mutate({
        ...editingBlog,
        title_en: values.title_en,
        title_ka: values.title_ka,
        description_en: values.description_en,
        description_ka: values.description_ka,
      });
    } else {
      const newBlog: Blog = {
        id: Date.now(),
        title_en: values.title_en,
        title_ka: values.title_ka,
        description_en: values.description_en,
        description_ka: values.description_ka,
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
          initialValues={
            editingBlog || {
              title_en: "",
              title_ka: "",
              description_en: "",
              description_ka: "",
            }
          }
          onFinish={handleFinish}
          editingBlog={editingBlog}
        />
      </Modal>
    </>
  );
};

export default BlogsTable;
