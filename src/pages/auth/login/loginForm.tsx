 import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form } from "antd";
import Link from "next/link";
import { InputCustom } from "@/components/common/form/input";
import { ActionButton } from "@/components/common/form/button";
import { LoginType } from "@/lib/types/types"; 
interface LoginDataType { 
  onSubmit?:(values: LoginType) => Promise<void>
}
const LoginForm = ({ onSubmit}: LoginDataType) => { 
 
  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{remember:false}}
        onFinish={onSubmit}
      >
        <InputCustom
          className="form-item"
          label=""
          name="username"
          required={true}
          type="text"
          message="Please input your Username!"
          placeholder="Username"
          prifixIcon={<UserOutlined className="site-form-item-icon" />}
          handleChange={() => void {}}
          SelectForm={undefined}
          Option={undefined}
        />
        <InputCustom
          className="form-item"
          name="password"
          required={true}
          type="password"
          message="Please input your Password!"
          placeholder="Password"
          label=""
          prifixIcon={<LockOutlined className="site-form-item-icon" />}
          handleChange={() => void {}}
          SelectForm={undefined}
          Option={undefined}
        />
        <Form.Item className="form-item checkbox-wrap">
          <Form.Item name="remember" valuePropName="checked"  noStyle>
            <Checkbox >Remember me</Checkbox>
          </Form.Item>
          <Link href="#" className="login-form-forgot">
            Forgot password
          </Link>
        </Form.Item>
        <Form.Item className="form-btn">
          <ActionButton
            type="primary"
            htmlType="submit"
            buttonClass="login-form-button"
            buttonName="Log in"
          />
        </Form.Item>
      </Form> 
    </>
  );
};

export default LoginForm;
