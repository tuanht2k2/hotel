import { Typography } from "antd";
import { Link } from "react-router-dom";
import { handleRemoveData } from "../../../utils/database";
import { ToastError, ToastSuccess } from "../../../utils/toast";

export const ADMIN_HEADER_ITEMS = [
  {
    key: "1",
    label: <Link to={"/"}>Return UserPage</Link>,
  },
  {
    key: "2",
    label: <Link to={"/settings"}>Settings</Link>,
  },
  {
    key: "3",
    label: <Link>Log out</Link>,
  },
];

export const ALL_ORDER_COLUMN = [
  {
    title: "Order Id",
    dataIndex: "orderId",
    width: "15%",
  },
  {
    title: "Username",
    dataIndex: "user",
    render: (user) => {
      return user.firstName.concat(" ", user.lastName);
    },
    filters: [
      {
        text: "Tuan",
        value: "Tuan",
      },
      {
        text: "Category 1",
        value: "Category 1",
      },
      {
        text: "Category 2",
        value: "Category 2",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) =>
      record.user.firstName
        .concat(" ", record.user.lastName)
        .toLowerCase()
        .includes(value),
    width: "12%",
  },
  {
    title: "Phone",
    dataIndex: "user",
    render: (user) => {
      return user.phoneNumber;
    },
    width: "10%",
  },
  {
    title: "Address",
    dataIndex: "user",
    render: (user) => {
      return user.address;
    },
    width: "10%",
  },
  {
    title: "Room Name",
    dataIndex: "room",
    render: (room) => {
      return room.roomName;
    },
    width: "10%",
  },
  {
    title: "Room Type",
    dataIndex: "room",
    render: (room) => {
      return room.roomType;
    },
    filters: [
      {
        text: "Single",
        value: "single",
      },
      {
        text: "Double",
        value: "double",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) =>
      record.room.roomType.toLowerCase().startsWith(value),
    width: "10%",
  },
  {
    title: "Price",
    dataIndex: "room",
    render: (room) => {
      return room.roomPrice;
    },
    sorter: (a, b) => a.price - b.price,
    width: "10%",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "Done",
        value: "done",
      },
      {
        text: "Cancel",
        value: "cancel",
      },
    ],
    onFilter: (value, record) => record.status.toLowerCase().startsWith(value),
    filterSearch: true,
    width: "10%",
  },
  {
    title: "Delete Room",
    dataIndex: "",
    key: "x",
    width: "10%",
    render: (record) => {
      return (
        <Typography.Link
          onClick={() => {
            try {
              handleRemoveData(`/orders/${record.orderId}`);
              ToastSuccess("Remove room successfully");
            } catch (error) {
              ToastError("Opps. Something went wrong. Remove room failed");
              throw new Error(error);
            }
          }}
        >
          Delete
        </Typography.Link>
      );
    },
  },
];

export const ALL_AMENITY_COLUMN = [
  {
    title: "Amenity Id",
    dataIndex: "amenityId",
    width: "15%",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    width: "15%",
  },
  {
    title: "Amenity Name",
    dataIndex: "amenityName",
    // render: (amenity) => {
    //   return amenity.amenityName;
    // },
    width: "15%",
  },
  {
    title: "Room Type",
    dataIndex: "room",
    render: (amenity) => {
      return amenity.roomType;
    },
    filters: [
      {
        text: "Single",
        value: "single",
      },
      {
        text: "Double",
        value: "double",
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) =>
      record.room.roomType.toLowerCase().startsWith(value),
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      {
        text: "Done",
        value: "done",
      },
      {
        text: "Cancel",
        value: "cancel",
      },
    ],
    onFilter: (value, record) => record.status.toLowerCase().startsWith(value),
    filterSearch: true,
    width: "10%",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    width: "15%",
  },
  {
    title: "Delete Room",
    dataIndex: "",
    key: "x",
    width: "10%",
    render: (record) => {
      return (
        <Typography.Link
          onClick={() => {
            try {
              handleRemoveData(`/orders/${record.orderId}`);
              ToastSuccess("Remove room successfully");
            } catch (error) {
              ToastError("Opps. Something went wrong. Remove room failed");
              throw new Error(error);
            }
          }}
        >
          Delete
        </Typography.Link>
      );
    },
  },
];
