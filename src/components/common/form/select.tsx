import { Form, Select } from 'antd';
import React from 'react'

interface SelectData {
    handleChange: any ,
    SelectForm:any,
    label:string, 
}

export const FormSelect = ({  handleChange, SelectForm, label }: SelectData) => {
  const { Option } = Select;
  return (
      <>
        <Form.Item
          name={label}
          label={label} >
          <Select placeholder="Select" onChange={handleChange} allowClear>
            {SelectForm?.map((item: any, index: number) => ( 
              <Option value={item.name} key={index}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </>
    );
  };
  
 