import React from "react";
import { useNavigate } from "react-router-dom";
import EditableTable from "@/components/EditableTable";
import { userColumns } from "./UserColumns";
import { useFetchUsers } from "@/hooks/useUsers";
import { User } from "./types";

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: users } = useFetchUsers();

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
