import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Form, Input, Button } from "antd";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";
import dayjs from "dayjs";

interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  created_at: string;
  last_sign_in_at: string;
  role: string;
}

const UsersTable: React.FC = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw new Error(error.message);

      const mappedUsers =
        data.users?.map((user) => ({
          id: user.id,
          full_name: user.user_metadata?.full_name || "none",
          username: user.user_metadata?.username || "none",
          email: user.user_metadata?.email || "none",
          phone_number: user.user_metadata?.phone_number || "none",
          created_at: dayjs(user.created_at).format("YYYY-MM-DD HH:mm"),
          last_sign_in_at: dayjs(user.last_sign_in_at).format(
            "YYYY-MM-DD HH:mm"
          ),
          role: user.role || "none",
        })) || [];

      setUsers(mappedUsers);
    };

    fetchUsers();
  }, []);

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
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Last Sign In",
      dataIndex: "last_sign_in_at",
      key: "last_sign_in_at",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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

  const handleFinish = (values: {
    full_name: string;
    username: string;
    email: string;
    phone_number: string;
  }) => {
    const fullName = values.full_name || "none";
    const username = values.username || "none";
    const phoneNumber = values.phone_number || "none";

    if (editingUser) {
      editUserMutation.mutate({
        ...editingUser,
        full_name: fullName,
        username,
        phone_number: phoneNumber,
        email: values.email,
      });
    } else {
      const newUser: User = {
        id: crypto.randomUUID(),
        full_name: fullName,
        username,
        email: values.email,
        phone_number: phoneNumber,
        created_at: dayjs().format("YYYY-MM-DD HH:mm"),
        last_sign_in_at: dayjs().format("YYYY-MM-DD HH:mm"),
        role: "authenticated",
      };
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
          initialValues={
            editingUser || {
              full_name: "",
              username: "",
              email: "",
              phone_number: "",
            }
          }
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
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input the email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
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
