import React from "react"; 
import Header from "./header"; 
import { AuthData } from "@/pages/api/authContext";
import Sppiner from "./common/spinner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const {auth}:{auth:boolean} = AuthData();  
    if(auth)
  return (                     
    <> 
     <Header /> 
      <section className="dashboard-layout-wrapper">
         {children}
      </section>
    </>
  );
  return <><Sppiner/></>
};
export default MainLayout;
