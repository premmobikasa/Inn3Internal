import React from "react";
import ModalLayout from "../common/modalLayout";
import { ModalType } from "../../lib/types/types";
import { Checkbox, Form } from "antd";
import { Input } from "antd";
import AssignData from "../../mock/modalform.json";
import FormButton from "./formButton";

const AssignHotelModel = ({ open, CloseModal, title, width }: ModalType) => {
  const AssignCheckData = AssignData.AssignData;
  const onChange = (e: any, item: any) => {
    console.log("item", item); //will remove
  };
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value, "values---data");
  const onFinish = (values: any) => {
    console.log("assign values of form: ", values);
  };

  return (
    <>
      <ModalLayout
        open={open}
        CloseModal={CloseModal}
        title={title}
        width={width}
      >
        <div className="assign-content-wrapper">
          <Form
            name="nomal_hotel-assign"
            className="hotel-assign"
            onFinish={onFinish}
          >
            <div className="header-search-wrapper">
              <Search placeholder="search" onSearch={onSearch} enterButton />
            </div>
            <Form.Item name="check" valuePropName="checked" noStyle>
              <div className="assign-item-checkbox">
                {AssignCheckData.map((item: any, index: number) => (
                  <Checkbox
                    onChange={(e) => onChange(e, item.name)}
                    key={index}
                  >
                    {item.name}
                  </Checkbox>
                ))}
              </div>
            </Form.Item>
            <FormButton handleClose={CloseModal} />
          </Form>
        </div>
      </ModalLayout>
    </>
  );
};

export default AssignHotelModel;
