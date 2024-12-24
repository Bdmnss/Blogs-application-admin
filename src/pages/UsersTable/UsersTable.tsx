import React from "react";
import { useNavigate } from "react-router-dom";
import EditableTable from "@/components/EditableTable";
import { userColumns } from "./UserColumns";
import { useFetchUsers } from "@/hooks/useUsers";
import { User } from "./types";
import { RoutePaths } from "@/enums/RoutePaths";

const UsersTable: React.FC = () => {
  const navigate = useNavigate();
  const { data: users } = useFetchUsers();

  const handleAdd = () => {
    navigate(RoutePaths.ADD_USER);
  };

  const handleEdit = (record: User) => {
    navigate(RoutePaths.EDIT_USER.replace(":id", record.id.toString()));
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
