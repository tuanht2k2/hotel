import { Form, Input, Modal, Radio } from "antd";
import FormItem from "../../../../AdminComponent/FormItem";

const ModalForm = ({
  open,
  onCreate,
  onCancel,
  title = "Create a new collection",
  okText = "Create",
  cancelText = "Cancel",
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title={title}
      okText={okText}
      onCancel={onCancel}
      // confirmLoading={true}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <FormItem
          name="amenityName"
          label="Amenity Name"
          rules={[{ required: true, message: "Please type your amenity name" }]}
        >
          <Input placeholder="Type your amenity name" />
        </FormItem>
        <FormItem
          required
          name={"roomType"}
          label="Room Type"
          rules={[
            {
              required: true,
              message: "Room Type is required",
            },
          ]}
        >
          <Radio.Group name="roomType">
            <Radio value="single"> Single </Radio>
            <Radio value="double"> Double </Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  );
};
export default ModalForm;
