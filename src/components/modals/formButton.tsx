import { Button, Form } from "antd";
import React from "react";
interface FormButton {
  handleClose?: () => void | undefined;
}
const FormButton = ({ handleClose }: FormButton) => {
  return (
    <>
      <Form.Item className="form-bottom-footer ant-modal-footer">
        <Button className="cancel-wrap" onClick={handleClose}>
          cancel
        </Button>
        <Button type="primary" htmlType="submit" className="login-form-button">
          save
        </Button>
      </Form.Item>
    </>
  );
};

export default FormButton;
