import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Typography } from "antd";

const ConfirmModal = ({
  contentConfirm,
  okTextConfirm,
  cancelTextConfirm,
  children,
  onOkConfirm,
}) => {
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: contentConfirm,
      okText: okTextConfirm,
      cancelText: cancelTextConfirm,
      onOk() {
        onOkConfirm();
      },
    });
  };
  return (
    <>
      {/* <Space> */}

      <Typography.Link onClick={confirm}>
        {children}
      </Typography.Link>
      {contextHolder}
    </>
  );
};
export default ConfirmModal;
