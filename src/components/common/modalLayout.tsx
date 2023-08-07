import React  from "react";   
import { Modal } from 'antd'; 

export interface ModalTypeData {
  open?: boolean | undefined,
  children:React.ReactNode,
  CloseModal?:() =>void | undefined,
  title:string, 
  width:number
}

const ModalLayout = ({ children ,CloseModal,title,width,open}: ModalTypeData) => {

  return (
    <>  
      <div className="modal-layout-wrapper">
        <Modal
            title= {title}
            open={open}
            centered
            footer={null}  
            onCancel={CloseModal}
            maskStyle={{ backdropFilter: `blur(${2}px)` }} 
            className="table-modal-wrapper"
            width={width}
        >
            {children}
        </Modal> 
      </div>
    </>
  );
};
export default ModalLayout;
