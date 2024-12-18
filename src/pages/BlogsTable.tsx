import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button } from "antd";
import dayjs from "dayjs";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";

interface Blog {
  id: number;
  title_en: string | null;
  description_en: string | null;
  created_at: string;
}

const BlogsTable: React.FC = () => {
  const queryClient = useQueryClient();
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

  const addBlogMutation = useMutation({
    mutationFn: async (newBlog: Blog) => {
      const { data, error } = await supabase.from("blogs").insert(newBlog);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setIsModalVisible(false);
    },
  });

  const editBlogMutation = useMutation({
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
      setIsModalVisible(false);
    },
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title_en",
      key: "title_en",
    },
    {
      title: "Description",
      dataIndex: "description_en",
      key: "description_en",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm"),
    },
  ];

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
      editBlogMutation.mutate({ ...editingBlog, ...values });
    } else {
      const newBlog = {
        id: Date.now(),
        created_at: new Date().toISOString(),
        ...values,
      };
      addBlogMutation.mutate(newBlog);
    }
  };

  return (
    <>
      <EditableTable
        columns={columns}
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
        <Form
          initialValues={editingBlog || { title_en: "", description_en: "" }}
          onFinish={handleFinish}
        >
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
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBlog ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BlogsTable;
