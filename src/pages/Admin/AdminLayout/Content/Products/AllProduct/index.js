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
  Image,
} from "antd";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AllProducts.module.scss";
import Title from "antd/es/typography/Title";
import {
  handleGetData,
  handleGetDataRef,
  handleRemoveData,
  handleUpdateData,
} from "../../../../../../utils/database";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../../../../../../utils/toast";
import Loading from "../../../../AdminComponent/Loading/Loading";
import ItemTitle from "../../../../AdminComponent/ItemTitle";
import { onValue } from "firebase/database";
import { isEqual } from "lodash";
import ConfirmModal from "../../../../AdminComponent/ConfirmModal";
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
  const [isLoading, setIsLoading] = useState(false);

  const getListRooms = async () => {
    try {
      setIsLoading(true);
      const roomsPath = `admin/create-room/rooms/`;
      const roomsRef = handleGetDataRef(roomsPath);
      onValue(roomsRef, async () => {
        const listRooms = await handleGetData("/admin/create-room/rooms");
        const dataRooms = [];
        const listKeys = [];
        for (let key in listRooms.val()) {
          const roomData = listRooms.val()[key];
          roomData.roomId = key;
          roomData.roomImage ? (
            (roomData.roomImage = (
              <Image
                width={"100%"}
                height={80}
                src={roomData.roomImage[0].imageUrl}
                onError={(err) => {
                  console.log(err);
                }}
              />
            ))
          ) : (
            <Image
              width={"100%"}
              height={80}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          );
          dataRooms.push(roomData);
          listKeys.push(key);
        }
        setData([...dataRooms]);
        setChangeData([...dataRooms]);
        setRoomIds([...listKeys]);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchByName = async (value) => {
    setIsLoading(true);
    const filterRooms = changeData.filter((room) => {
      if (room.roomName.toLowerCase().includes(value)) {
        return true;
      }
    });
    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setData(filterRooms);
  };

  const onChangeRoom = async (value) => {
    console.log(value);
    setIsLoading(true);
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
    await setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
        if (isEqual(data, newData)) {
          ToastWarning("Your data is not changed !");
          return;
        } else {
          delete newData[index].roomImage;
          await handleUpdateData(
            `/admin/create-room/rooms/${roomIds[index]}`,
            newData[index]
          );
          ToastSuccess("Update room information success", 2000);
        }
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
      width: "12%",
      editable: false,
    },
    {
      title: "Room Name",
      dataIndex: "roomName",
      width: "10%",
      editable: true,
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      render: (roomType) => {
        return roomType.charAt(0).toUpperCase() + roomType.slice(1);
      },
      width: "10%",
      editable: false,
    },
    {
      title: "Room Amenity",
      dataIndex: "roomAmenity",
      width: "10%",
      editable: false,
      render: (amenity) => {
        if (amenity.length <= 3) {
          return amenity.join(", ");
        }
        return amenity.slice(0, 3).join(", ") + "...";
      },
    },
    {
      title: "Room Rank",
      dataIndex: "roomRank",
      render: (roomRank) => {
        return roomRank.charAt(0).toUpperCase() + roomRank.slice(1);
      },
      width: "10%",
      editable: false,
    },
    {
      title: "Room Price",
      dataIndex: "roomPrice",
      width: "10%",
      editable: true,
      render: (price) => {
        return Number(price).toLocaleString();
      },
    },
    {
      title: "Room Description",
      dataIndex: "roomDesc",
      width: "20%",
      editable: true,
    },
    {
      title: "Edit Rooms",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <ConfirmModal
              contentConfirm={"Are you sure to modify this room ?"}
              okTextConfirm={"Modify"}
              cancelTextConfirm={"Cancel"}
              onOkConfirm={() => {
                save(record.key);
              }}
            >
              Save
            </ConfirmModal>
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
    {
      title: "Delete Room",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <ConfirmModal
            contentConfirm={"Are you sure to delete this room ?"}
            okTextConfirm={"Yes, delete it"}
            cancelTextConfirm={"Cancel"}
            onOkConfirm={async () => {
              try {
                setIsLoading(true);
                if (record?.orders) {
                  await Object.keys(record?.orders).forEach(async (orderId) => {
                    const res = await handleGetData(`/orders/${orderId}`);
                    const user = await handleGetData(
                      `/users/${res.val()?.user.uid}`
                    );
                    const data = user.val();
                    delete data?.orders[orderId];
                    await handleUpdateData(
                      `/users/${res.val()?.user.uid}`,
                      data
                    );
                    await handleRemoveData(`orders/${orderId}`);
                  });
                }
                await handleRemoveData(
                  `/admin/create-room/rooms/${record.roomId}`
                );
                await setTimeout(() => {
                  setIsLoading(false);
                }, 500);
                ToastSuccess("Remove room successfully");
              } catch (error) {
                ToastError("Opps. Something went wrong. Remove room failed");
                console.log(error);
                throw new Error(error);
              }
            }}
          >
            Delete
          </ConfirmModal>
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
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });
  return (
    <div className={cx("all__rooms--container")}>
      <ItemTitle
        title="Manage All Room Information"
        textContent="You can view and manage all rooms in this page"
      ></ItemTitle>
      <div className={cx("all__room--main")}>
        <div className={cx("all__rooms--title")}>
          <Row style={{ display: "flex", justifyContent: "center" }}>
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

            <Col span={7} style={{ marginRight: "20px" }}>
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

            <Col span={7} style={{ marginRight: "20px" }}>
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
          </Row>
        </div>
        <div className={cx("all__rooms--form")}>
          <Title level={5}>Room Summary</Title>
          <Form form={form} component={false}>
            {!isLoading ? (
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
            ) : (
              <Loading />
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AllRooms;
