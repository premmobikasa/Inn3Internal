import React, { useRef } from "react";
import ModalLayout from "../common/modalLayout";
import { Form } from "antd";
import { ModalType } from "../../lib/types/types";
import { InputCustom } from "../common/form/input";
import hotel_group_form from "../../mock/modalform.json";
import FormButton from "./formButton";

const HotelModal = ({handleGetAddData, open, CloseModal, title, width ,formRef}: ModalType | any) => {
  const hotelGroup = hotel_group_form?.hotel_group_form;
  // const formRef:any = useRef(null);
  // const onFinish = (values: any) => {
  //   handleGetAddData(values)
  //   // console.log("Received values of form: ", values);
  // };
  // console.log(editData,"editData++")
  return (
    <>
      <ModalLayout
        open={open}
        CloseModal={CloseModal}
        title={title}
        width={width}
      >
        <Form
          name="nomal_hotel_group"
          className="hotel-group-form"
          initialValues={{ remember: true }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleGetAddData}
          ref={formRef}
        >
          {hotelGroup.map(({
             className, label, name, required, type, message, placeholder, 
             prifixIcon, handleChange, SelectForm, Option }: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  <InputCustom
                    className={className}
                    label={label}
                    name={name}
                    required={title == "add hotel group" ? required : false}
                    type={type}
                    message={message}
                    placeholder={placeholder}
                    prifixIcon={prifixIcon}
                    handleChange={handleChange}
                    SelectForm={SelectForm}
                    Option={Option} 
                  />
                </React.Fragment>
              );
           })} 
         <FormButton handleClose={CloseModal}/>
        </Form>
      </ModalLayout>
    </>
  );
};

export default HotelModal;
