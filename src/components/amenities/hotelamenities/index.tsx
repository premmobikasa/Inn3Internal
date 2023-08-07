import React, { useContext, useState } from "react";
import { HeaderSection } from "../../common/commonHeader"; 
import { GlobleContext } from "../../common/modalContext";
import { ModalContextType } from "../../../lib/types/types";
import HotelAmenityTable from "./hotelamenityTable";
import HotelAmenityModal from "../modal/hotelamenityModal";

const HotelAmenities = () => {
  const {
     state,dispatch
  }: ModalContextType | any = useContext(GlobleContext)!; // (!)  is explicitly declared as non-null or undefiend
  const handleClick = () => dispatch({type:"OPEN_MODAL",payload:"Add Hotel Amenity"}) 
  const handleEdit = () => dispatch({type:"OPEN_MODAL",payload:"Edit Hotel Amenity"}) 
  const handleModalClose = () => dispatch({type:"CLOSE_MODAL"}) 
  const {isOpen,modalTitle} =state

  return (
    <>
      <HotelAmenityModal 
         open={isOpen}
         CloseModal={handleModalClose}
         title={modalTitle}
         width={500}
      />
      <div className="hotel-group-wrapper amenity-wrapper">
        <HeaderSection
          title="Hotel Amenities"
          button_text="add Hotel amenity"
          handleClick={handleClick}
        />

        <HotelAmenityTable
          title={"hotel amenity"}
          handleEditModal={handleEdit}
          handleAssignModal={() => {
            alert("Function not implemented.");
          }}
        />
      </div>
    </>
  );
};

export default HotelAmenities;
