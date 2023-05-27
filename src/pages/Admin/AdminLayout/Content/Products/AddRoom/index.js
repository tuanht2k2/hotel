import { PlusOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import { Option } from "antd/es/mentions";
import { Typography } from "antd";

import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AddRoom.module.scss";
import { handlePushData } from "../../../../../../utils/database";
import { v4 as uuidv4 } from "uuid";
const { Title, Text } = Typography;

let cx = classNames.bind(styles);

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// handlePushData("/admin/create-room/rooms", {
//   key: uuidv4(),
//   r_image: "image 10",
//   r_name: "Room 10",
//   r_desc: ["Room Descsd", "Room Desc 10"],
//   r_type: "Single",
//   r_amenity: "Amenity 10",
//   r_price: 300000,
// }).then((data) => {
//   console.log(data);
// });

const AddRoom = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  return (
    <div className={cx("add__room--container")}>
      <div className={cx("add__room--title")}>
        <Row style={{ backgroundColor: "#F8F9FB", padding: "0 40px" }}>
          <Col span={24}>
            <Typography
              style={{
                marginBottom: 10,
                fontFamily: "monospace",
              }}
            >
              <Title style={{ margin: 0 }} level={3}>
                Add new room
              </Title>
              <Text style={{ opacity: 0.6 }}>
                This is the page to create new room
              </Text>
            </Typography>
          </Col>
        </Row>
      </div>

      <div className={cx("add__room--content")}>
        <Row>
          <div className={cx("room__content--title")}>
            <Typography
              style={{
                marginBottom: 10,
                fontFamily: "monospace",
              }}
            >
              <Title style={{ margin: 0 }} level={3}>
                Field Information
              </Title>
              <Text style={{ opacity: 0.6 }}>
                You must fill in this fields to create new room
              </Text>
            </Typography>
          </div>
        </Row>

        <Row>
          <Col span={24}>
            <div className={cx("room__content--main")}>
              <Form
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 20,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                  maxWidth: "100%",
                }}
              >
                <Row>
                  <Col span={18}>
                    <Form.Item required label="Room Name">
                      <Input />
                    </Form.Item>
                    <Form.Item required label="Room Type">
                      <Radio.Group>
                        <Radio value="single"> Single </Radio>
                        <Radio value="double"> Double </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      required
                      name="select-multiple"
                      label="Room Amenity"
                      rules={[
                        {
                          required: false,
                          message: "Please select your favourite colors!",
                          type: "array",
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Please select favourite colors"
                      >
                        <Option value="red">Red</Option>
                        <Option value="green">Green</Option>
                        <Option value="blue">Blue</Option>
                      </Select>
                    </Form.Item>
                    <Row>
                      <Col span={6}>
                        <Form.Item required label="Create at">
                          <DatePicker style={{ width: "80%" }} />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item required label="Room Price">
                          <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Room Description">
                      <TextArea rows={4} />
                    </Form.Item>
                    <Row>
                      <Col
                        span={24}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button className={cx("add__room--btn")}>
                          Create New Room
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Add Room Image"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      style={{ width: "100%" }}
                    >
                      <Upload
                        className={cx("add__room--upload")}
                        action="/upload.do"
                        listType="picture-card"
                      >
                        <div>
                          <PlusOutlined />
                          <div
                            style={{
                              marginTop: 8,
                            }}
                          >
                            Upload Image
                          </div>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Row>
                      <Col span={24}>
                        <Col span={12}>
                          <Checkbox
                            checked={componentDisabled}
                            onChange={(e) =>
                              setComponentDisabled(e.target.checked)
                            }
                          >
                            Disabled
                          </Checkbox>
                        </Col>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default () => <AddRoom />;
