import React from "react";
import { useNavigate } from "react-router-dom";
import { useAddUserMutation } from "../userMutations";
import UserForm from "../components/UserForm";
import { User } from "../types";
import dayjs from "dayjs";

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const addUserMutation = useAddUserMutation();

  const handleFinish = (values: {
    full_name: string;
    username: string;
    email: string;
    phone_number: string;
    password: string;
  }) => {
    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      full_name: values.full_name || "none",
      username: values.username || "none",
      email: values.email,
      phone_number: values.phone_number || "none",
      created_at: dayjs().format("YYYY-MM-DD HH:mm"),
      last_sign_in_at: dayjs().format("YYYY-MM-DD HH:mm"),
      role: "authenticated",
      password: values.password,
    };
    addUserMutation.mutate(newUser, {
      onSuccess: () => {
        navigate("/users");
      },
    });
  };

  return (
    <div>
      <h1>Add User</h1>
      <UserForm
        initialValues={{
          full_name: "",
          username: "",
          email: "",
          phone_number: "",
          password: "",
        }}
        onFinish={handleFinish}
        editingUser={null}
      />
    </div>
  );
};

export default AddUser;
