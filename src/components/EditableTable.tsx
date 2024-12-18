import { Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";

interface EditableTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  onAdd: () => void;
  onEdit: (record: T) => void;
}

const EditableTable = <T extends object>({
  columns,
  data,
  onAdd,
  onEdit,
}: EditableTableProps<T>) => {
  return (
    <>
      <Button type="primary" onClick={onAdd} style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table
        columns={[
          ...columns,
          {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => (
              <Button onClick={() => onEdit(record)}>Edit</Button>
            ),
          },
        ]}
        dataSource={data}
        rowKey="id"
      />
    </>
  );
};

export default EditableTable;
