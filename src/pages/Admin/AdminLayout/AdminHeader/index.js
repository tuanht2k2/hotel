import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import styles from "./AdminHeader.module.scss";
import { RightOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBell } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown } from "antd";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../../../firebase";
import { signOutAction } from "../../../../actions/user";
import { handleGetData } from "../../../../utils/database";

let cx = classNames.bind(styles);

const AdminHeader = () => {
  const navigateQuery = useLocation();
  const [navTitle, setNavTitle] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      const signOut = signOutAction();
      dispatch(signOut);

      navigate("/sign-in");
    });
  };
  const items = [
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
      label: <Link onClick={handleSignOut}>Log out</Link>,
    },
  ];

  const getDataUser = async () => {
    const currentUser = auth.currentUser;
    const res = await handleGetData(`/users/${currentUser.uid}`);
    setUserInfo(res.val());
  };

  useEffect(() => {
    if (navigateQuery.pathname.includes("all-rooms")) {
      setNavTitle("All Rooms");
    } else if (navigateQuery.pathname.includes("add-rooms")) {
      setNavTitle("Add New Room");
    } else if (navigateQuery.pathname.includes("all-orders")) {
      setNavTitle("All Orders");
    } else if (navigateQuery.pathname.includes("amenity")) {
      setNavTitle("Manage Amenity");
    } else if (navigateQuery.pathname.includes("profile")) {
      setNavTitle("Profile");
    }
    getDataUser();
  }, [navigateQuery]);

  return (
    <Row>
      <Col span={24}>
        <div className={cx("adminPage-header")}>
          <div className={cx("adminPage-header-left")}>
            <Link to={"/"}>
              <a href="https://logowik.com/airbnb-vector-logo-2705.html">
                <img
                  className={cx("svg1")}
                  src="https://logowik.com/content/uploads/images/123_airbnb.jpg"
                  alt="no_image"
                />
              </a>
            </Link>
            <Link to={"/"}>
              <h2>Trang chủ</h2>
            </Link>
            <RightOutlined className={cx("right__icon")} />
            <h2>Admin</h2>
            {navTitle && (
              <div className={cx("nav__title")}>
                <RightOutlined className={cx("right__icon")} />
                <h2>{navTitle}</h2>
              </div>
            )}
          </div>

          <div className={cx("adminPage-header-right")}>
            <div className={cx("adminPage__notification")}>
              <FontAwesomeIcon
                icon={faBell}
                style={{ color: "#1677ff" }}
              ></FontAwesomeIcon>
            </div>
            <Dropdown
              menu={{
                items,
              }}
              placement="top"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <Button
                className={cx("admin__header--btn")}
                style={{ height: "100%", border: "none" }}
              >
                <div className={cx("header-right-profile")}>
                  <img
                    src={
                      "https://64.media.tumblr.com/970f8c9047f214078b5b023089059228/4860ecfa29757f0c-62/s640x960/9578d9dcf4eac298d85cf624bcf8b672a17e558c.jpg"
                    }
                    alt=""
                  />
                  <p className={cx("admin__header--info")}>
                    <span>{userInfo.lastName}</span>
                    <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                  </p>
                </div>
              </Button>
            </Dropdown>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AdminHeader;
