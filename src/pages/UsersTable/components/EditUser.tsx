import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase";
import { useEditUserMutation } from "../userMutations";
import UserForm from "../components/UserForm";
import { User } from "../types";
import dayjs from "dayjs";

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const editUserMutation = useEditUserMutation();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!id) throw new Error("User ID is undefined");
      const { data, error } = await supabase.auth.admin.getUserById(id);
      if (error) throw new Error(error.message);
      return {
        id: data.user.id,
        full_name: data.user?.user_metadata?.full_name || "none",
        username: data.user?.user_metadata?.username || "none",
        email: data.user?.email || "none",
        phone_number: data.user?.user_metadata?.phone_number || "none",
        created_at: dayjs(data.user.created_at).format("YYYY-MM-DD HH:mm"),
        last_sign_in_at: dayjs(data.user.last_sign_in_at).format(
          "YYYY-MM-DD HH:mm"
        ),
      } as User;
    },
  });

  const handleFinish = (values: {
    full_name: string;
    username: string;
    email: string;
    phone_number: string;
  }) => {
    if (user) {
      editUserMutation.mutate(
        {
          ...user,
          full_name: values.full_name,
          username: values.username,
          email: values.email,
          phone_number: values.phone_number,
        },
        {
          onSuccess: () => {
            navigate("/users");
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
      <h1>Edit User</h1>
      <UserForm
        initialValues={
          user || {
            full_name: "",
            username: "",
            email: "",
            phone_number: "",
          }
        }
        onFinish={handleFinish}
        editingUser={user ?? null}
      />
    </div>
  );
};

export default EditUser;
