import React from "react";
import Link from "next/link"; 
import logo from "../../public/assets/images/Logo.svg";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd"; 
import { usePathname } from 'next/navigation'
import { ImageAction } from "./common/image";
import headerData from "../mock/header.json";
import { useRouter } from "next/router"; 
import Cookies from 'js-cookie';

const Header = () => { 
  const pathname = usePathname()  
  const Router = useRouter();
  const handleLogout = () => {
    Router.push("auth/login")
    localStorage.clear();
    Cookies.remove('token')
  }
  return (
    <header className="header-wrapper">
      <nav className="container">
        <ul> 
          <li>
            <Link href="/">
               <ImageAction imgSrc={logo}/>
            </Link>
          </li> 
          {headerData?.headerData.map((item,index:number) => { 
          return (
            <li className={`${item.link == pathname ?"active-menu" :"unactive"}`} key={index} >
              <Link href={item.link} legacyBehavior><a>{item.label}</a></Link>
            </li>
          );
        })}
        </ul>
        <div className="profile-wrapper"  onClick={handleLogout}> 
            <Space wrap size={16}>
              <Avatar shape="square" className="flex justify-center items-center" icon={<UserOutlined />} />
            </Space>{" "} 
        </div>
      </nav>
    </header>
  );
};
export default Header;
 

