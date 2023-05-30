import { Form } from "antd";
import React from "react";

const FormItem = ({
  children,
  name = "",
  label = "",
  rules = [
    {
      required: true,
      message: "Please input the title of collection!",
    },
  ],
}) => {
  return (
    <div>
      <Form.Item name={name} label={label} rules={rules}>
        {children}
      </Form.Item>
    </div>
  );
};

export default FormItem;
