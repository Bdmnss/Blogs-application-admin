import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button } from "antd";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";

interface User {
  id: string;
  full_name: string;
  username: string;
}

const UsersTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username");
      if (error) throw new Error(error.message);
      return data.map(
        (user: {
          id: string;
          full_name: string | null;
          username: string | null;
        }) => ({
          ...user,
          full_name: user.full_name || "",
          username: user.username || "",
        })
      );
    },
  });

  const addUserMutation = useMutation({
    mutationFn: async (newUser: User) => {
      const { data, error } = await supabase.from("profiles").insert(newUser);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalVisible(false);
    },
  });

  const editUserMutation = useMutation({
    mutationFn: async (updatedUser: User) => {
      const { data, error } = await supabase
        .from("profiles")
        .update(updatedUser)
        .eq("id", updatedUser.id);
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsModalVisible(false);
    },
  });

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
  ];

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: User) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };

  const handleFinish = (values: { full_name: string; username: string }) => {
    if (editingUser) {
      editUserMutation.mutate({ ...editingUser, ...values });
    } else {
      const newUser = { id: crypto.randomUUID(), ...values };
      addUserMutation.mutate(newUser);
    }
  };

  return (
    <>
      <EditableTable
        columns={columns}
        data={users || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
      <Modal
        title={editingUser ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingUser || { full_name: "", username: "" }}
          onFinish={handleFinish}
        >
          <Form.Item
            name="full_name"
            label="Full Name"
            rules={[{ required: true, message: "Please input the full name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input the username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UsersTable;
