import React from "react";
import { Form, Input, Button } from "antd";
import { Blog } from "../types";

interface BlogFormProps {
  initialValues: Partial<Blog>;
  onFinish: (values: {
    title_en: string;
    title_ka: string;
    description_en: string;
    description_ka: string;
  }) => void;
  editingBlog: Blog | null;
}

const BlogForm: React.FC<BlogFormProps> = ({
  initialValues,
  onFinish,
  editingBlog,
}) => {
  const handleFinish = (values: {
    title_en: string;
    title_ka: string;
    description_en: string;
    description_ka: string;
  }) => {
    onFinish(values);
  };

  return (
    <Form initialValues={initialValues} onFinish={handleFinish}>
      <Form.Item
        name="title_en"
        label="Title (EN)"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="title_ka" label="Title (KA)">
        <Input />
      </Form.Item>
      <Form.Item
        name="description_en"
        label="Description (EN)"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description_ka" label="Description (KA)">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingBlog ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogForm;
