import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  AutoComplete,
  Row,
  Col,
  Select,
  Button,
} from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AllProducts.module.scss";
import Title from "antd/es/typography/Title";
import {
  handleGetData,
  handleUpdateData,
} from "../../../../../../utils/database";

let cx = classNames.bind(styles);

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
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [options, setOptions] = useState([]);
  const [roomIds, setRoomIds] = useState([]);
  const [changeData, setChangeData] = useState([]);

  const getListRooms = async () => {
    try {
      const listRooms = await handleGetData("/admin/create-room/rooms");
      const dataRooms = [];
      const listKeys = [];
      for (let key in listRooms.val()) {
        dataRooms.push(listRooms.val()[key]);
        listKeys.push(key);
      }
      setData([...dataRooms]);
      setChangeData([...dataRooms]);
      setRoomIds([...listKeys]);
    } catch (error) {
      console.log(error);
    }
  };

  const searchResult = (query, listRooms) => {
    const results = [];
    listRooms.forEach((_, idx) => {
      if (_.r_name.toLowerCase().includes(query)) {
        results.push({
          value: _.r_name,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                Found {query} on{" "}
                <a href={`/`} target="_blank" rel="noopener noreferrer">
                  {_.r_name}
                </a>
              </span>
              <span>results</span>
            </div>
          ),
        });
      }
    });
    return results;
  };
  const onChangeRoom = (value) => {
    const results = changeData.filter((room) => {
      if(!value) {
        return room;
      }
      console.log(room);
      if (room.r_type.toLowerCase() === value || room.status.toLowerCase() === value) {
        return true;
      }
    });
    setData(results);
  };

  useEffect(() => {
    getListRooms();
  }, [editingKey]);

  const handleSearch = (value) => {
    console.log(searchResult(value, data));
    setOptions(value ? searchResult(value, data) : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const isEditing = (record = {}) => {
    return record.key === editingKey;
  };
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
        await handleUpdateData(
          `/admin/create-room/rooms/${roomIds[index]}`,
          newData[index]
        );
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
    <div className={cx("all__rooms--container")}>
      <Row>
        <Col span={24}>
          <Title level={3}>Manage All Room Information</Title>
        </Col>
      </Row>
      <div className={cx("all__rooms--title")}>
        <Row>
          <Col span={8} style={{ marginRight: "20px" }}>
            <Title level={5}>What are you looking for ?</Title>
            <AutoComplete
              style={{
                width: "100%",
              }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
              notFoundContent={"Not found room"}
              allowClear={true}
              placeholder="Type to find room by room name"
            >
            </AutoComplete>
          </Col>

          <Col span={6} style={{ marginRight: "20px" }}>
            <Title level={5}>Room Type</Title>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Select room type"
              optionFilterProp="children"
              onChange={onChangeRoom}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              allowClear={true}
              options={[
                {
                  value: "single",
                  label: "Single",
                },
                {
                  value: "double",
                  label: "Double",
                },
              ]}
            />
          </Col>
         
          <Col span={2} style={{ alignSelf: "flex-end" }}>
            <Button
              style={{
                width: "100%",
                backgroundColor: "#1677ff",
                color: "#fff",
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </div>
      <div className={cx("all__rooms--form")}>
        <Title level={5}>Room Summary</Title>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={data && mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </div>
  );
};
export default AllRooms;
