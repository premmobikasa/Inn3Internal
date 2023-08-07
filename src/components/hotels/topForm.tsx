import React from "react";
import { Button, Form, FormInstance, Select } from "antd";
import { InputCustom } from "../common/form/input"; 
import hotelsTopForm from "../../mock/hotels.json"

const TopForm = () => {
  const { Option } = Select;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
  };
  const TopFormData= hotelsTopForm.hotelsTopForm;
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values); //will delete once I have done 
  };
  const formRef = React.useRef<FormInstance>(null);

  const onCityChange = (value: string,e:any) => { 
    if(e =="city") {
      console.log(value,"cityData")
    } else if (e == "state"){
      console.log(value,"stateData")
    } else if (e == "country") {
      console.log(value,"country")
    }

    switch (value) {
      case "delhi":
        formRef.current?.setFieldsValue({ note: "Hi, delhi!" });
        break;
      case "goa":
        formRef.current?.setFieldsValue({ note: "Hi, goa!" });
        break;
      case "gurgaon":
        formRef.current?.setFieldsValue({ note: "Hi gurgaon!" });
        break;
      default:
        break;
    }
  };
 
  return (
    <>
      <Form
        name="normal_login"
        className="hotels-form"
        layout="vertical"
        initialValues={{ remember: true }}
        {...layout}
        ref={formRef}
        onFinish={onFinish}
      >
        {TopFormData.map((item, index:number) => { 
          const {className,name,label,message,type,
            placeholder,prifixIcon,required,selectData,Option}=item;
          return (
            <InputCustom
              key={index}
              className={className}
              name={name}
              label={label}
              message={message}
              type={type}
              placeholder={placeholder}
              prifixIcon={prifixIcon}
              required={required}
              handleChange={onCityChange}
              SelectForm={selectData}
              Option={Option}
            />
          );
        })}

        <Form.Item label={" "} className="hotels-btn-wrap">
          <Button aria-label="reset-button" onClick={() => {}}>reset</Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            aria-label="search-button"
          >
            search
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default TopForm;

 