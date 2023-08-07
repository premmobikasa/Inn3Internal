import React, { useContext, useEffect, useRef, useState } from "react";
import { HeaderSection } from "@/components/common/commonHeader";
import HotelModal from "@/components/modals/hotelGroupModal";
import HotelTable from "@/components/hotelgroup/hotelGroupTable";
import AssignHotelModel from "@/components/modals/assignHotel";
import { ModalContextType } from "@/lib/types/types";
import { GlobleContext } from "@/components/common/modalContext";
import { useHotelGroupServices } from "../api/services";

const HotelGroup = () => {
  const [isOpenAssign, setIsOpenAssign] = useState(false);
  const [assignTitle, setAssignTitle] = useState("");
  const [editData, setEditData]: any = useState([]); 
  const formRef: any = useRef();
  const { state, dispatch
  }: ModalContextType | any = useContext(GlobleContext)!;
 
  const handleModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: "add hotel group" });
  };
  const handleClose = () => {
    dispatch({ type: 'CLOSE_MODAL'});
    formRef.current?.resetFields();
  };
  const {handleUpdateSubmit,handleAddSubmit,handleDeleteHotelGroups}:any = useHotelGroupServices(editData,handleClose);
  const handleEdit = (e: any) => { 
    setEditData(e);
    dispatch({ type: 'OPEN_MODAL', payload: "Edit hotel group" }); 
  };

  useEffect(() => {
    if (state?.isOpen && state?.modalTitle === "Edit hotel group") {
      formRef.current?.setFieldsValue({ HotelGroup: editData.name });
    }
  }, [state?.isOpen, state?.modalTitle, editData.name]);
  // assign
  const handleModalAssignClose = () => setIsOpenAssign(false);
  const handleAssignModal = () => {
     setAssignTitle("Assign Hotels"); 
     setIsOpenAssign(true); 
  };
  let AddFormFalg = state.modalTitle === "add hotel group";
  let EditFormFlag = state.modalTitle === "Edit hotel group"; 

  return (
    <>
      <HotelModal
        open={state?.isOpen}
        CloseModal={handleClose}
        title={state?.modalTitle}
        width={500}
        formRef={formRef} 
        handleGetAddData={
          AddFormFalg ? handleAddSubmit : EditFormFlag && handleUpdateSubmit
        }
      />
      <AssignHotelModel
        open={isOpenAssign}
        CloseModal={handleModalAssignClose}
        title={assignTitle}
        width={700}
      />
      <div className="hotel-group-wrapper">
        <HeaderSection
          title="hotel groups"
          button_text="add hotel group"
          handleClick={handleModal}
        />
        <HotelTable
          handleEditModal={handleEdit}
          handleAssignModal={handleAssignModal} 
          handleDelete= {handleDeleteHotelGroups}
        />
      </div>
    </>
  );
};

export default HotelGroup;
