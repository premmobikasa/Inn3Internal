import React, { useState } from 'react'
import ModalLayout from '../common/modalLayout'
import { Checkbox, Form ,Input} from 'antd'
import FormButton from './formButton'
import { InputCustom } from '../common/form/input'
import HotelsAddModal from   "../../mock/hotels.json" 
import HotelCheckData from   "../../mock/hotels.json" 
import TextAreaCustom from '../common/form/textarea'
import UploadInput from '../common/form/upload'
 
const HotelsModal =({open,CloseModal,title,width}:any) => {
  const [checkbox,setCheckBox]:any = useState([])
  const { TextArea } = Input;
  const HotelCheck = HotelCheckData.HotelCheckData;
  const ModalData = HotelsAddModal.HotelsAddModal
  const onFinish = (value:any) => {
    console.log(value,"value data for hotels modal")
    console.log(checkbox,"checkbox+++") //check data store in []
  }

  
  const onChange = (e: any, item: any) => {
    // setCheckBox([...checkbox, item])
    const value = item;
    const isChecked = e.target.checked;
    // console.log(value,"checkValue")
    // console.log(isChecked,"CheckFlag")
    if (isChecked) {
      // Add the value to the array if it's checked
      setCheckBox([...checkbox, value]);
    } else {
      // Remove the value from the array if it's unchecked
      const updatedValues = checkbox.filter((val:any) => val !== value);
      setCheckBox(updatedValues);
    }
    // console.log("item", item); //will remove
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
          className="hotels-form-modal"
          initialValues={{ remember: true }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <div className="forms-content-wrap">
            {ModalData.map((item, index: number) => {
              return (
                <React.Fragment key={index}>
                  {item.type == "textArea" ? (
                    <TextAreaCustom
                      label={item.label}
                      placeholder={item.placeholder}
                      name={item.name}
                    />
                  ) : (
                    <InputCustom
                      className={item.className}
                      name={item.name}
                      label={item.label}
                      message={item.message}
                      type={item.type}
                      placeholder={item.placeholder}
                      prifixIcon={item.prifixIcon}
                      required={item.required}
                      handleChange={() => {}}
                      SelectForm={item.selectData}
                      Option={item.Option}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="hotels-modal-checkbox">
            <Form.Item name="check" valuePropName="checked" noStyle>
              {" "}
              {HotelCheck.map((item: any, index: number) => (
                <Checkbox onChange={(e) => onChange(e, item.name)} key={index}>
                  {item.name}
                </Checkbox>
              ))}
            </Form.Item>
          </div>

          <UploadInput label="Hotel Logo"/>
          <FormButton handleClose={CloseModal} />
        </Form>
      </ModalLayout>
    </>
  );
}

export default HotelsModal