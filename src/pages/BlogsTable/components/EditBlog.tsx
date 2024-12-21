import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBlog, useEditBlogMutation } from "@/hooks/useBlogs";
import BlogForm from "../components/BlogForm";

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editBlogMutation = useEditBlogMutation();
  const { data: blog, isLoading } = useFetchBlog(id);

  const handleFinish = (values: {
    title_en: string;
    title_ka: string;
    description_en: string;
    description_ka: string;
  }) => {
    if (blog) {
      editBlogMutation.mutate(
        {
          ...blog,
          title_en: values.title_en,
          title_ka: values.title_ka,
          description_en: values.description_en,
          description_ka: values.description_ka,
        },
        {
          onSuccess: () => {
            navigate("/blogs");
          },
        }
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Blog</h1>
      <BlogForm
        initialValues={
          blog || {
            title_en: "",
            title_ka: "",
            description_en: "",
            description_ka: "",
          }
        }
        onFinish={handleFinish}
        editingBlog={blog || null}
      />
    </div>
  );
};

export default EditBlog;
