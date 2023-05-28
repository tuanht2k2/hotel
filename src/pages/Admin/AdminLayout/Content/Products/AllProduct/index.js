import {
  Form,
  InputNumber,
  Popconfirm as Onconfirm,
  Table,
  Typography,
  Input,
  Row,
  Col,
  Select,
  Button,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AllProducts.module.scss";
import Title from "antd/es/typography/Title";
import {
  handleGetData,
  handleUpdateData,
} from "../../../../../../utils/database";
import { ToastError, ToastSuccess } from "../../../../../../utils/toast";
// import SpinFC from "antd/es/spin";
import Loading from '../../../../AdminComponent/Loading/Loading'
const { Search } = Input;
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
  const [roomIds, setRoomIds] = useState([]);
  const [changeData, setChangeData] = useState([]);
  const getListRooms = async () => {
    try {
      const listRooms = await handleGetData("/admin/create-room/rooms");
      const dataRooms = [];
      const listKeys = [];
      for (let key in listRooms.val()) {
        const roomData = listRooms.val()[key];
        // console.log(roomData.roomImage[0]);
        roomData.roomImage ? (
          (roomData.roomImage = (
            <Image
              width={150}
              src={roomData.roomImage[0].imageUrl}
              onError={(err) => {
                console.log(err);
              }}
              // rootClassName={cx("allRoom__image--preview")}
            />
          ))
        ) : (
          <Image
            width={150}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
        dataRooms.push(roomData);
        listKeys.push(key);
      }
      setData([...dataRooms]);
      setChangeData([...dataRooms]);
      setRoomIds([...listKeys]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchByName = (value) => {
    const filterRooms = changeData.filter((room) => {
      if (room.roomName.toLowerCase().includes(value)) {
        return true;
      }
    });
    setData(filterRooms);
  };

  const onChangeRoom = (value) => {
    const results = changeData.filter((room) => {
      if (!value) {
        return room;
      }
      if (
        room.roomType.toLowerCase() === value ||
        room.roomRank.toLowerCase() === value
      ) {
        return true;
      }
    });
    setData(results);
  };

  useEffect(() => {
    getListRooms();
  }, [editingKey]);

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
        delete newData[index].roomImage;
        await handleUpdateData(
          `/admin/create-room/rooms/${roomIds[index]}`,
          newData[index]
        );
        ToastSuccess("Update room information success", 2000);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
        ToastError(
          "Opps. Something went wrong. Update room information failed.",
          2000
        );
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Room Image",
      dataIndex: "roomImage",
      width: "15%",
      editable: false,
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      width: "15%",
      editable: true,
    },
    {
      title: "Room Description",
      dataIndex: "roomDesc",
      width: "20%",
      editable: true,
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      width: "10%",
      editable: false,
    },
    {
      title: "Room Amenity",
      dataIndex: "roomAmenity",
      width: "15%",
      editable: false,
    },
    {
      title: "Room Rank",
      dataIndex: "roomRank",
      width: "10%",
      editable: false,
    },
    {
      title: "Room Price",
      dataIndex: "roomPrice",
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
            <Onconfirm title="Sure to cancel?" onConfirm={cancel}>
              <p style={{ color: "#1677ff", display: "inline-block" }}>
                Cancel
              </p>
            </Onconfirm>
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
            <Search
              placeholder="Type to search by room name"
              allowClear
              enterButton="Search"
              size="medium"
              onSearch={onSearchByName}
            />
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

          <Col span={6} style={{ marginRight: "20px" }}>
            <Title level={5}>Room Rank</Title>
            <Select
              style={{ width: "100%" }}
              showSearch
              placeholder="Select room rank"
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
                  value: "normal",
                  label: "Normal",
                },
                {
                  value: "superior",
                  label: "Superior",
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
          {
            data.length ? <Table
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
            // loading={!data.length && <SpinFC />}
          /> : <Loading/>
          }
          
        </Form>
      </div>
    </div>
  );
};
export default AllRooms;
