import React from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

let cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Quản lí phòng", "sub1", <FontAwesomeIcon icon={faBox} />, [
    getItem(<Link to={"/admin/all-rooms"}>Tất cả phòng</Link>, "1"),
    getItem(<Link to={"/admin/add-rooms"}>Thêm phòng</Link>, "2"),
  ]),
  getItem("Quản lí đơn hàng", "sub2", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/all-orders"}>Tất cả đơn hàng</Link>, "3"),
    getItem(<Link to={"/admin/amenity"}>Quản lí tiện nghi</Link>, "4"),
  ]),
  getItem("Quản lí hồ sơ", "sub3", <UserOutlined />, [
    getItem(<Link to={"/admin/profile"}>Trang cá nhân</Link>, "5"),
  ]),
];

const AdminSidebar = () => {
  return (
    <div
      className={cx("admin__sidebar--container")}
      style={{
        width: 256,
        position: "fixed",
      }}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2", "sub3"]}
        mode="inline"
        theme="dark"
        items={items}
        style={{
          height: "100vh",
        }}
      />
    </div>
  );
};

export default AdminSidebar;
