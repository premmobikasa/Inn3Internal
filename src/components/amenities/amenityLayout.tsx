import React from "react";
import Header from "../header";
import { AuthData } from "@/pages/api/authContext";
import Spinner from "../common/spinner";
const AmenityLayout = ({ children }: { children: React.ReactNode }) => {
  const {auth}:{auth:boolean} = AuthData();  
  if(auth)
  return (
    <>
      <Header />
      <section className="amenity-layout-wrapper">{children}</section>
    </>
  );
  return <><Spinner/></>
};

export default AmenityLayout;
