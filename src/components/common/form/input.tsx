import React from "react";
import { Form, Input, Select } from "antd";

interface InputData {
  className: string;
  name: string;
  message: string;
  type: string;
  label: string;
  placeholder: string;
  prifixIcon: React.ReactNode;
  required: any;
  handleChange: any;
  SelectForm: any;
  Option: any;
}

export const InputCustom = ({
  className,
  name,
  prifixIcon,
  required,
  message,
  placeholder,
  type,
  label,
  SelectForm,
  Option,
  handleChange,
}: InputData) => {
  return ( 
    <>
      {type === "select" ? (
        <Form.Item
          name={label}
          label={label}
          // rules={[{ required: true, message: 'this field is required' }]}
        >
          <Select placeholder="Select" onChange={(e) => handleChange(e,label)} allowClear>
            {SelectForm?.map((item: any, index: number) => (
              <Option value={item.name} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          className={className}
          name={name}
          rules={[{ required: required, message: message }]}
          label={label}
        >
          <Input type={type} prefix={prifixIcon} placeholder={placeholder} />
        </Form.Item>
      )}
    </>
  );
};
