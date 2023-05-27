import React from "react";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
import AdminSidebar from "../sidebar";
import { Col, Row } from "antd";
import AdminHeader from "../AdminHeader";

let cx = classNames.bind(styles);

const AdminLayout = ({ children }) => {
  return (
    <div className={cx("admin__layout--container")}>
      <AdminHeader/>
      <Row style={{ marginTop: "55px" }}>
        <Col md={4}>
          <AdminSidebar />
        </Col>
        <Col md={20}>{children}</Col>
      </Row>
    </div>
  );
};
export default AdminLayout;
