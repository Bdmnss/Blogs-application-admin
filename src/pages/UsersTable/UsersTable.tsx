import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";
import dayjs from "dayjs";
import { useAddUserMutation, useEditUserMutation } from "./userMutations";
import { userColumns } from "./UserColumns";
import UserForm from "./components/UserForm";
import { User } from "./types";

const UsersTable: React.FC = () => {
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
          email: user.email || "none",
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

  const addUserMutation = useAddUserMutation();
  const editUserMutation = useEditUserMutation();

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
    password: string;
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
      const newUser: User & { password: string } = {
        id: crypto.randomUUID(),
        full_name: fullName,
        username,
        email: values.email,
        phone_number: phoneNumber,
        created_at: dayjs().format("YYYY-MM-DD HH:mm"),
        last_sign_in_at: dayjs().format("YYYY-MM-DD HH:mm"),
        role: "authenticated",
        password: values.password,
      };
      addUserMutation.mutate(newUser);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <EditableTable
        columns={userColumns}
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
        <UserForm
          initialValues={
            editingUser || {
              full_name: "",
              username: "",
              email: "",
              phone_number: "",
              password: "",
            }
          }
          onFinish={handleFinish}
          editingUser={editingUser}
        />
      </Modal>
    </>
  );
};

export default UsersTable;
