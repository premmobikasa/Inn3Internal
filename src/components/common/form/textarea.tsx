import { Form,Input } from 'antd'
import React from 'react'

interface TextAreaType {
    label:string,
    placeholder:string,
    name:string
}

const TextAreaCustom = ({label,placeholder,name}:TextAreaType) => {
    const {TextArea} = Input ;
  return (
    <>
      <Form.Item label={label} name={name}>
        <TextArea rows={2} placeholder={placeholder} maxLength={160} />
      </Form.Item>
    </>
  );
}

export default TextAreaCustom