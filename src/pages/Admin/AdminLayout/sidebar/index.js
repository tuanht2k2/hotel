import React, { useEffect, useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

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
  getItem("Manage rooms", "sub1", <FontAwesomeIcon icon={faBox} />, [
    getItem(<Link to={"/admin/all-rooms"}>All rooms</Link>, "1"),
    getItem(<Link to={"/admin/add-rooms"}>Add new rooms</Link>, "2"),
    getItem(<Link to={"/admin/amenity"}>Manage amenity</Link>, "4"),
  ]),
  getItem("Manage orders", "sub2", <AppstoreOutlined />, [
    getItem(<Link to={"/admin/all-orders"}>All orders</Link>, "3"),
  ]),
  getItem("Manage profile", "sub3", <UserOutlined />, [
    getItem(<Link to={"/admin/profile"}>Profile</Link>, "5"),
  ]),
];

const AdminSidebar = () => {
  const [key, setKey] = useState("");
  const navigateQuery = useLocation();
  useEffect(() => {
    if (navigateQuery.pathname.includes('all-rooms')) {
      setKey('1');
    } else if (navigateQuery.pathname.includes('add-rooms')) {
      setKey('2');
    }
    else if (navigateQuery.pathname.includes('all-orders')) {
      setKey('3');
    }
    else if (navigateQuery.pathname.includes('amenity')) {
      setKey('4');
    }
    else if (navigateQuery.pathname.includes('profile')) {
      setKey('5');
    }
  }, [navigateQuery]);
  return (
    <div
      className={cx("admin__sidebar--container")}
      style={{
        width: 256,
        position: "fixed",
      }}
    >
      <Menu
        // defaultSelectedKeys={["1"]}
        selectedKeys={[key]}
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
