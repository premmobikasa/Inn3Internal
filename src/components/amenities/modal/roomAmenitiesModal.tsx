import React from "react";
import { Form, Select } from "antd";
import ModalLayout from "@/components/common/modalLayout";
import FormButton from "@/components/modals/formButton";
import { InputCustom } from "@/components/common/form/input";
import { FormSelect } from "@/components/common/form/select";
import TextAreaCustom from "@/components/common/form/textarea";
import UploadInput from "@/components/common/form/upload";
import Link from "next/link";

const RoomAmenityModal = ({ open, CloseModal, title, width }: any) => {
    const { Option } = Select;
  const onFinish = (e: any) => {
    console.log(e, "ee+++");
  };
const selectData = [
    {name:"option1"},
    {name:"option2"},
    {name:"option3"}
]
  return (
    <>
      <ModalLayout
        open={open}
        CloseModal={CloseModal}
        title={title}
        width={width}
      >
        <Form
          name="nomal_hotels"
          className="hotels-form-modal hotel-amenity-modal room-amenities"
          initialValues={{ remember: true }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        > 
            <FormSelect 
            handleChange={() => {}} 
            SelectForm={selectData} 
            label={"Amenity Category"}  
            />
            <InputCustom
              className={"form-input"}
              name={"amenity_name"}
              message={"this field is required"}
              type={"text"}
              label={"Amenity Name"}
              placeholder={"enter Amenity Name"}
              prifixIcon={undefined}
              required={true}
              handleChange={() => {}}
              SelectForm={null}
              Option={null}
            />  
            <TextAreaCustom 
            label={"Description"} 
            placeholder={"description"} 
            name={"description"} />
            <InputCustom
              className={"form-input"}
              name={"trip_amenity_code"}
              message={"this field is required"}
              type={"number"}
              label={"Trip Amenity Code"}
              placeholder={"enter Trip Amenity Code"}
              prifixIcon={undefined}
              required={true}
              handleChange={() => {}}
              SelectForm={null}
              Option={null}
            /> 
             <Form.Item className="view-trip-wrap">
                <Link href="#">View Trip Amenity Code</Link>
             </Form.Item>
             
            <UploadInput label="Amenity Image"/> 

          <FormButton handleClose={CloseModal} />
        </Form>
      </ModalLayout>
    </>
  );
};

export default RoomAmenityModal;
  