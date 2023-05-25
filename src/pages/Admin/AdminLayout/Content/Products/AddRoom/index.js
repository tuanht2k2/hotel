import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
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
const { Title, Text } = Typography;

let cx = classNames.bind(styles);

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const AddRoom = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  return (
    <div className={cx("add__room--container")}>
      <Row>
        <Col span={24}>
          <Typography
            style={{
              textAlign: "center",
              marginBottom: 10,
              fontFamily: "monospace",
            }}
          >
            <Title level={3}>Add new room</Title>
            <Text style={{ opacity: 0.6 }}>
              This is the page to create new room
            </Text>
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{
              maxWidth: "100%",
            }}
          >
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
              <Col span={12}>
                <Form.Item required label="Create at">
                  <DatePicker style={{ width: "80%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item required label="Room Price">
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Room Description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="Add Room Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Row>
              <Col span={24}>
                <Form.Item style={{textAlign : 'center'}}>
                  <Button style={{width : '40%'}}>Create Room</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Col span={12}>
        <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Disabled
        </Checkbox>
      </Col>
    </div>
  );
};
export default () => <AddRoom />;
