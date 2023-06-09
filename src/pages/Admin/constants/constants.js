import { Link } from "react-router-dom";
import { handleRemoveData } from "../../../utils/database";
import { ToastError, ToastSuccess } from "../../../utils/toast";
import ConfirmModal from "../AdminComponent/ConfirmModal";

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
      return room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1);
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
    dataIndex: "price",
    render: (price) => {
      return price.toLocaleString();
    },
    sorter: (a, b) => {
      return a.price - b.price;
    },
    width: "10%",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
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
        <ConfirmModal
          contentConfirm={"Are you sure to delete this order ?"}
          okTextConfirm={"Yes, delete it"}
          cancelTextConfirm={"Cancel"}
          onOkConfirm={async () => {
            try {
              handleRemoveData(`/orders/${record.orderId}`);
              ToastSuccess("Remove order successfully");
            } catch (error) {
              ToastError("Opps. Something went wrong. Remove order failed");
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

export const ALL_AMENITY_COLUMN = [
  {
    title: "Amenity Id",
    dataIndex: "amenityId",
    width: "20%",
  },
  {
    title: "Amenity Name",
    dataIndex: "amenityName",
    render: (amenityName) => {
      return amenityName;
    },
    width: "15%",
  },
  {
    title: "Created By",
    dataIndex: "_createdBy",
    width: "10%",
  },
  {
    title: "Room Type",
    dataIndex: "roomType",
    render: (roomType) => {
      return roomType.charAt(0).toUpperCase() + roomType.slice(1);
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
    title: "Created At",
    dataIndex: "_createdAt",
    width: "15%",
    render: (createdAt) => {
      return createdAt.split("-").reverse().join("/");
    },
  },
  {
    title: "Delete Amenity",
    dataIndex: "",
    key: "x",
    width: "10%",
    render: (record) => {
      return (
        <ConfirmModal
          contentConfirm={"Are you sure to delete this amenity ?"}
          okTextConfirm={"Yes, delete it"}
          cancelTextConfirm={"Cancel"}
          onOkConfirm={async () => {
            try {
              await handleRemoveData(`/amenity/${record.key}`);
              ToastSuccess("Remove amenity successfully");
            } catch (error) {
              ToastError("Opps. Something went wrong. Remove amenity failed");
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
