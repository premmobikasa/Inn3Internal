import React, { useContext } from "react";
import { HeaderSection } from "../../common/commonHeader"; 
import { GlobleContext } from "../../common/modalContext";
import { ModalContextType } from "../../../lib/types/types";  
import HotelAmenityTable from "../hotelamenities/hotelamenityTable";
import RoomAmenityModal from "../modal/roomAmenitiesModal";

const RoomAmenities = () => {
  const {
    state,dispatch
 }: ModalContextType | any = useContext(GlobleContext)!; // (!)  is explicitly declared as non-null or undefiend
 const handleClick = () => dispatch({type:"OPEN_MODAL",payload:"Add room Amenity"}) 
 const handleEdit = () => dispatch({type:"OPEN_MODAL",payload:"Edit room Amenity"}) 
 const handleModalClose = () => dispatch({type:"CLOSE_MODAL"}) 
 const {isOpen,modalTitle} =state

  return (
    <>
      <RoomAmenityModal
         open={isOpen}
         CloseModal={handleModalClose}
         title={modalTitle}
         width={500}
      />
      <div className="hotel-group-wrapper amenity-wrapper">
        <HeaderSection
          title="room Amenities"
          button_text="add room amenity"
          handleClick={handleClick}
        />

        <HotelAmenityTable
          title="room amenity"
          handleEditModal={handleEdit}
          handleAssignModal={() => {
            alert("Function not implemented.");
          }}
        />
      </div>
    </>
  );
};

export default RoomAmenities;
