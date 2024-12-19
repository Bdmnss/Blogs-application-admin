import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase";
import EditableTable from "@/components/EditableTable";
import dayjs from "dayjs";
import { userColumns } from "./UserColumns";
import { User } from "./types";

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
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

  const handleAdd = () => {
    navigate("/users/add");
  };

  const handleEdit = (record: User) => {
    navigate(`/users/edit/${record.id}`);
  };

  return (
    <>
      <EditableTable
        columns={userColumns}
        data={users || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
    </>
  );
};

export default UsersTable;
