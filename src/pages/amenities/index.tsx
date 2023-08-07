import AmenityLayout from "@/components/amenities/amenityLayout";
import TabMenu from "@/components/amenities/tabmenu";
import MainLayout from "@/components/mainlayout";
import Link from "next/link";
import React from "react";

const Amenities = () => {
  return (
    <AmenityLayout>
      <section className="amenties-wrapper">
        {/* Amenities page
        <Link href={"/"}>Home</Link>    */}
        <TabMenu />
      </section>
    </AmenityLayout>
  );
};

export default Amenities;
