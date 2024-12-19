import React from "react";
import { Form, Input, Button } from "antd";
import { Blog } from "../types";

interface BlogFormProps {
  initialValues: Partial<Blog>;
  onFinish: (values: { title_en: string; description_en: string }) => void;
  editingBlog: Blog | null;
}

const BlogForm: React.FC<BlogFormProps> = ({
  initialValues,
  onFinish,
  editingBlog,
}) => {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
      <Form.Item
        name="title_en"
        label="Title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description_en"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
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
