import React from "react";
import { Form, Input, Button } from "antd";
import { User } from "../UsersTable";

interface UserFormProps {
  initialValues: Partial<User & { password: string }>;
  onFinish: (values: {
    full_name: string;
    username: string;
    email: string;
    phone_number: string;
    password: string;
  }) => void;
  editingUser: User | null;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onFinish,
  editingUser,
}) => {
  return (
    <Form initialValues={initialValues} onFinish={onFinish}>
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
        rules={[{ required: true, message: "Please input the phone number!" }]}
      >
        <Input />
      </Form.Item>
      {!editingUser && (
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password />
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingUser ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
