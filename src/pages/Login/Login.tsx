import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSetAtom } from "jotai";
import { userAtom } from "@/store/atoms";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/supabase/auth";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button } from "antd";
import { validationRules } from "./validations";

const Login: React.FC = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();

  const { mutate: handleLogin } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      const user = data.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    handleLogin({ email: data.email, password: data.password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card title="Login" className="w-full max-w-md">
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email ? errors.email.message : ""}
          >
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password ? errors.password.message : ""}
          >
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
