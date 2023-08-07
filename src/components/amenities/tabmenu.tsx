import { Layout, Menu } from "antd";
import { useState } from "react";
import AmenitiesCategory from "./category";
import React from "react";
import HotelAmenities from "./hotelamenities";
import RoomAmenities from "./roomamenities";

const { Sider } = Layout;
const TabMenu = () => {
  const [selectedKey, setSelectedKey] = useState("Amenity_Category");

  const handleMenuClick = ({ key }:{key:string}) => {
    setSelectedKey(key);
  };
  const menuItems = [
    { key: "Amenity_Category",label:<AmenitiesCategory/>, name: "Amenity Category" },
    { key: "Hotel_Amenities", label:  <HotelAmenities /> ,name: "Hotel Amenities"},
    { key: "Room_Amenities", label: <RoomAmenities/>,name: "Room Amenities"  },
  ];
  return (
    <>
      <Sider className="amenities-menu-wrapper">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick} 
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>{item.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>  
      <>
        <div className="amenities-content-wrapper">
          {menuItems.map(
            (item) => selectedKey === item.key && <React.Fragment key={item.key}>{item.label}</React.Fragment>
          )}
        </div>
      </>
    </>
  );
};

export default TabMenu;
