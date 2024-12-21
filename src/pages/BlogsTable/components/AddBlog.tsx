import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "@/hooks/useBlogs";
import BlogForm from "../components/BlogForm";
import { Blog } from "../types";
import dayjs from "dayjs";

const AddBlog: React.FC = () => {
  const navigate = useNavigate();
  const addBlogMutation = useAddBlogMutation();

  const handleFinish = (values: {
    title_en: string;
    title_ka: string;
    description_en: string;
    description_ka: string;
  }) => {
    const newBlog: Blog = {
      id: Date.now(),
      title_en: values.title_en,
      title_ka: values.title_ka,
      description_en: values.description_en,
      description_ka: values.description_ka,
      created_at: dayjs().format("YYYY-MM-DD HH:mm"),
    };
    addBlogMutation.mutate(newBlog, {
      onSuccess: () => {
        navigate("/blogs");
      },
    });
  };

  return (
    <div>
      <h1>Add Blog</h1>
      <BlogForm
        initialValues={{
          title_en: "",
          title_ka: "",
          description_en: "",
          description_ka: "",
        }}
        onFinish={handleFinish}
        editingBlog={null}
      />
    </div>
  );
};

export default AddBlog;
