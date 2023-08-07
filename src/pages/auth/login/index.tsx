import React from "react";
import { useRouter } from "next/router";
import logo from "../../../../public/assets/images/Logo.svg";
import { ImageAction } from "@/components/common/image";
import { useMutation } from "@apollo/client"; 
import Sppiner from "@/components/common/spinner";
import { LOGIN_USER } from "@/lib/graphqlOperation/operation";
import { LoginType } from "@/lib/types/types";
import { Notification } from "@/components/common/notification";
import LoginForm from "./loginForm";
import Cookies from "js-cookie";
import { createApolloClient } from '@/lib/apollo-client';

const client = createApolloClient(null);

const Login = () => {
  const router = useRouter();
  // const client = createApolloClient();
  const [LoginUser, { loading }] = useMutation(LOGIN_USER, { client });
  const onSubmit = async (values: LoginType) => {
    const { password, username ,remember} = values;  
    try {
      const { data } = await LoginUser({
        variables: {
          identifier: username,
          password: password,
        },
      });
      localStorage.setItem("userLogin", "true");
      localStorage.setItem("token", data?.signIn?.accessToken);
      // I will remove if  i'm not use cookies
      // document.cookie = `userLogin=true; SameSite=Strict; Secure`;
      Notification("success", "User Login", "login successfully ");
      Cookies.set('token', `${data?.signIn?.accessToken}`)
      if(remember){
        Cookies.set('token', `${data?.signIn?.accessToken}`)//, { expires: 7 }
       }
      // cookies--end-->> 
      router.push("/");
    } catch (error: any) { 
      Notification("error", "Login Error", error?.message);
    }
  };
  if (loading) return <Sppiner />;
  return (
    <div className="login-wrapper">
      <div className="form-content-wrapper">
        <div className="logo">
          <ImageAction imgSrc={logo} />
        </div>
        <div className="login-form-wrapper">
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Login;
