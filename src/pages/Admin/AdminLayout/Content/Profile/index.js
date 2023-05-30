import { Button, Col, Form, Input, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import Typography from "antd/es/typography/Typography";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import ModalForm from "./ModalForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../../firebase";
import { handleGetData } from "../../../../../utils/database";
import ItemTitle from "../../../AdminComponent/ItemTitle";

let cx = classNames.bind(styles);

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const Profile = () => {
  const [form] = Form.useForm();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [userID, setUserId] = useState("");
  const [userInfor, setUserInfor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpenFormModal(false);
  };
  const onCancel = () => {
    setOpenFormModal(false);
  };
  const getUserInfor = async (uid) => {
    const res = await handleGetData(`/users/${uid}`);
    setUserInfor(res.val());
    form.setFieldValue(res.val());
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserId(user.uid);
    });
    getUserInfor(userID);
  }, []);

  return (
    <div className={cx("profile--container")}>
      <div className={cx("profile--title")}>
        <Row style={{ backgroundColor: "#F8F9FB", padding: "0 40px" }}>
          <Col span={24}>
            <Typography
              style={{
                marginBottom: 10,
                fontFamily: "monospace",
              }}
            >
              <Title style={{ margin: 0 }} level={3}>
                Change your information
              </Title>
              <Text style={{ opacity: 0.6 }}>
                This is the page to change your information
              </Text>
            </Typography>
          </Col>
        </Row>
      </div>
      <div className={cx("profile--content")}>
        <Row className={cx('profile__content--title')}>
          <ItemTitle
            title=" Field Information"
            textContent="You must fill in this fields to change your information"
          />
        </Row>
        <div className={cx("profile__content--main")}>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
          >
           <Row style={{justifyContent : 'space-between'}}>
            <Col span={11}>
            <Form.Item
              // name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "First Name cannot empty",
                },
              ]}
            >
              <Input value={userInfor.firstName} />
            </Form.Item>
            </Col>
            <Col span={11}>
            <Form.Item
              // name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Last Name cannot empty",
                },
              ]}
            >
              <Input value={userInfor.lastName} />
            </Form.Item>
            </Col>
           </Row>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Email cannot empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Phone cannot empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Address cannot empty",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space>
                <SubmitButton form={form} />
                <Button htmlType="reset">Reset</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setOpenFormModal(true);
                  }}
                >
                  Change Password
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <ModalForm
          open={openFormModal}
          onCreate={onCreate}
          onCancel={onCancel}
          title="Change your password"
          okText="Save"
        ></ModalForm>
      </div>
    </div>
  );
};
export default Profile;
