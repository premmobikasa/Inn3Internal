import HotelsTable from "@/components/hotels/hotelsTable";
import MainLayout from "@/components/mainlayout";
import { useRouter } from "next/router";
import React from "react";
import hotelGroupTable from "@/mock/table.json";

const TableData = ({ hotelData }: any) => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const routeSlug = slug;
  const hotelsTableData = hotelGroupTable.hotelGroupTable; 
 // console.log(router.query, "router+++");  // will delete once I have done 

  return (
    <>
      {routeSlug && 
        <MainLayout>
          <div className="hotels-wrapper hotel-group-wrapper">
          <HotelsTable
           hotelsTableData ={hotelsTableData}
            handleAssignModal={(): void => {
              alert("Function not implemented.");
            }}
            handleEditModal={(): void => {
              alert("Function not implemented.");
            }}
          /></div>
        </MainLayout>
 
      }
    </>
  );
};
export default TableData;

// export async function getStaticPaths() {
//   // Generate paths for each product
//   const HotelsTableData = hotelGroupTable.hotelGroupTable;
//   const paths = HotelsTableData.map((product) => ({
//     params: { productId: product.key },
//   }));

//   return {
//     paths,
//     fallback: false, // Show 404 if the path doesn't match any product
//   };
// }

// export async function getStaticProps({ params }) {
//   // Fetch data for the specific product
//   console.log(params,"params")
//   const HotelsTableData = hotelGroupTable.hotelGroupTable;
//   const hotelData = HotelsTableData.find((p) => p.key === params.productId);

//   return {
//     props: {
//       hotelData,
//     },
//   };
// }
