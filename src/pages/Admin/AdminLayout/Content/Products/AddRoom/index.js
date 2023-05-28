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
  Modal,
  message,
} from "antd";
import { Typography } from "antd";

import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AddRoom.module.scss";
import { handlePushData } from "../../../../../../utils/database";
import { v4 as uuidv4 } from "uuid";
import uploadFile from "../../../../../../utils/storage";
import { ToastError, ToastSuccess } from "../../../../../../utils/toast";
const { Title, Text } = Typography;

let cx = classNames.bind(styles);

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// y
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const AddRoom = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload room image
      </div>
    </div>
  );

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onFinish = async (value) => {
    try {
      const listImage = [];
      await fileList.forEach(async (fileImage, index) => {
        const res = await uploadFile(
          `/rooms/${fileImage?.originFileObj.name}`,
          fileImage.originFileObj
        );
        await listImage.push({ imageId: uuidv4(), imageUrl: res });
        value.roomImage = listImage;
        if (index === fileList.length - 1) {
          value.key = uuidv4();
          value.roomCreatedAt = JSON.stringify(new Date());
          handlePushData("/admin/create-room/rooms", value);
          ToastSuccess("Add new room success", 2000);
        }
      });
    } catch (error) {
      console.log(error);
      ToastError("Opps. Something went wrong. Add room failed !!");
    }
  };
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
                onFinish={onFinish}
                name="formName"
              >
                <Row>
                  <Col span={18}>
                    <Form.Item required name={"roomName"} label="Room Name">
                      <Input name="roomName" />
                    </Form.Item>
                    <Form.Item required name={"roomType"} label="Room Type">
                      <Radio.Group name="roomType">
                        <Radio value="single"> Single </Radio>
                        <Radio value="double"> Double </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      required
                      name="roomAmenity"
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
                        <Select.Option value="red">Red</Select.Option>
                        <Select.Option value="green">Green</Select.Option>
                        <Select.Option value="blue">Blue</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item required name={"roomRank"} label="Room Rank">
                      <Radio.Group name="roomRank">
                        <Radio value="normal">Normal</Radio>
                        <Radio value="superior"> Superior </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Row>
                      <Col span={6}>
                        <Form.Item
                          required
                          name={"roomCreatedAt"}
                          label="Create at"
                        >
                          <DatePicker
                            name="roomCreatedAt"
                            style={{ width: "80%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          required
                          label="Room Price"
                          name={"roomPrice"}
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            name="roomPrice"
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item name={"roomDesc"} label="Room Description">
                      <TextArea name="roomDesc" rows={4} />
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
                      name={"roomImage"}
                    >
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        name="roomImage"
                        beforeUpload={beforeUpload}
                        customRequest={dummyRequest}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Col span={24}>
                  <Col span={12}>
                    <Checkbox
                      checked={componentDisabled}
                      onChange={(e) => setComponentDisabled(e.target.checked)}
                    >
                      Disabled
                    </Checkbox>
                  </Col>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};
export default () => <AddRoom />;
