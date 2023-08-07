import React, { useContext } from "react";
import { HeaderSection } from "../../common/commonHeader";
import CategoryTable from "./categoryTable";
import CategoryModal from "../modal/categoryModal";
import { GlobleContext } from "../../common/modalContext";
import { ModalContextType } from "../../../lib/types/types";
 
const AmenitiesCategory = () => {
  const {  
     state, dispatch
    }:ModalContextType | any = useContext(GlobleContext)!; // (!)  is explicitly declared as non-null or undefiend
  const handleClick = ()=> dispatch({type:"OPEN_MODAL",payload:"add Amenity Category"}) 
  const handleEdit = () => dispatch({type:"OPEN_MODAL",payload:"edit Amenity Category"})
  const handleModalClose = () => dispatch({type:"CLOSE_MODAL"})

  return (
    <>
      <CategoryModal
        open={state?.isOpen}
        CloseModal={handleModalClose}
        title={state.modalTitle}
        width={500}
      />
      <div className="hotel-group-wrapper amenity-wrapper">
        <HeaderSection
          title="Amenity Category"
          button_text="add new Category"
          handleClick={handleClick}
        />

        <CategoryTable handleEditModal={handleEdit} />
      </div>
    </>
  );
};

export default AmenitiesCategory;
