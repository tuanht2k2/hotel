import { Form, InputNumber, Popconfirm, Table, Typography, Input } from "antd";
import { useState } from "react";

const originData = [
  {
    key: "1",
    r_id : 'rid 1',
    r_image : 'image 1',
    r_name: "Room Tuan",
    r_desc: 'Room Desc',
    r_type : 'Single',
    r_amenity : 'Amenity',
    r_price : 200000,
  },
  {
    key: "2",
    r_id : 'rid 2',
    r_image : 'image 2',
    r_name: "Room Tuan",
    r_desc: 'Room Desc',
    r_type : 'Single',
    r_amenity : 'Amenity',
    r_price : 200000,
  },
  {
    key: "3",
    r_id : 'rid 3',
    r_image : 'image 3',
    r_name: "Room Tuan",
    r_desc: 'Room Desc',
    r_type : 'Single',
    r_amenity : 'Amenity',
    r_price : 200000,
  },
  {
    key: "4",
    r_id : 'rid 4',
    r_image : 'image 4',
    r_name: "Room Tuan",
    r_desc: 'Room Desc',
    r_type : 'Single',
    r_amenity : 'Amenity',
    r_price : 200000,
  },
];
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const AllRooms = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      roomImage: "",
      roomName: "",
      roomDsc: "",
      roomAmenity: "",
      roomPrice: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Room Image",
      dataIndex: "r_image",
      width: "15%",
      editable: true,
    },
    {
      title: "Room Name",
      dataIndex: "r_name",
      width: "15%",
      editable: true,
    },
    {
      title: "Room Description",
      dataIndex: "r_desc",
      width: "20%",
      editable: true,
    },
    {
      title: "Room Type",
      dataIndex: "r_type",
      width: "10%",
      editable: true,
    },
    {
      title: "Room Amenity",
      dataIndex: "r_amenity",
      width: "15%",
      editable: true,
    },
    {
      title: "Room Price",
      dataIndex: "r_price",
      width: "15%",
      editable: true,
    },
    {
      title: "Edit Rooms",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => {
        console.log(record);
        return {
          record,
          // inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
export default AllRooms;
// .editable-row .ant-form-item-explain {
//   position: absolute;
//   top: 100%;
//   font-size: 12px;
// }
