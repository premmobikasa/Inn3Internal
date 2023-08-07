import React from "react";
import { Form } from "antd";
import ModalLayout from "@/components/common/modalLayout";
import FormButton from "@/components/modals/formButton";
import { InputCustom } from "@/components/common/form/input";

const CategoryModal = ({ open, CloseModal, title, width }: any) => {
  const onFinish = (e: any) => {
    console.log(e, "ee+++");
  };

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
          className="hotels-form-modal amenity-category-modal"
          initialValues={{ remember: true }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        > 
            <InputCustom
              className={"form-input"}
              name={"category_name"}
              message={"this field is required"}
              type={"text"}
              label={"Category Name"}
              placeholder={"enter Category Name"}
              prifixIcon={undefined}
              required={undefined}
              handleChange={() => {}}
              SelectForm={null}
              Option={null}
            /> 
          <FormButton handleClose={CloseModal} />
        </Form>
      </ModalLayout>
    </>
  );
};

export default CategoryModal;
