import { Form, Input, Modal } from "antd";
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
          name="oldPassword"
          label="Old Password"
          title={"OldPassword"}
          rules={[{ required: true, message: "Please type your old password" }]}
        >
          <Input.Password placeholder="Type your old password" />
        </FormItem>
        <FormItem
          name="newPassword"
          label="New password"
          rules={[{ required: true, message: "Please type your new password" }]}
        >
          <Input.Password placeholder="Type your new password" />
        </FormItem>

        <FormItem
          name="confirmNewPassword"
          label="Confirm New password"
          rules={[
            {
              required: true,
              message: "Please type your confirm new password",
            },
          ]}
        >
          <Input.Password placeholder="Type your confirm new password" />
        </FormItem>
      </Form>
    </Modal>
  );
};
export default ModalForm;
