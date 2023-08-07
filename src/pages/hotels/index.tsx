import React, { useContext } from "react"; 
import { HeaderSection } from "@/components/common/commonHeader"; 
import TopForm from "@/components/hotels/topForm";
import MainLayout from "@/components/mainlayout"; 
import HotelsModal from "@/components/modals/hotelsModal"; 
import HotelsTable from "@/components/hotels/hotelsTable";
import hotelGroupTable from "@/mock/table.json";
import { GlobleContext } from "@/components/common/modalContext";
import { ModalContextType } from "@/lib/types/types";

const Hotels = () => {  
  const hotelsTableData = hotelGroupTable.hotelGroupTable; 
   const {state,dispatch}:ModalContextType |any = useContext(GlobleContext)!
  const handleModal =() => dispatch({type:"OPEN_MODAL",payload:"add a Hotel"}) 
  const handleEdit =() => dispatch({type:"OPEN_MODAL",payload:"Edit a Hotel"}) 
  const handleModalClose =() => dispatch({type:"CLOSE_MODAL"}) 

  return (
    <MainLayout>
       <div className="hotels-wrapper hotel-group-wrapper">
        <HeaderSection 
          title="Hotels"
          button_text ="add hotel group"
          handleClick={handleModal}  
        />
         <TopForm />
         <HotelsTable handleEditModal = {handleEdit}  handleAssignModal={(): void => {
          alert("Function not implemented.");
        } } hotelsTableData={hotelsTableData} />  

        {/* modal--- */}
         <HotelsModal 
           open={state?.isOpen}
           CloseModal={handleModalClose}
           title={state?.modalTitle}
           width={812}
           />
      </div>
    </MainLayout>
  );
};

export default Hotels;
