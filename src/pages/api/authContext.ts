import Router from "next/router";
import React, { useEffect, useState } from 'react';
export const AuthData = ( ) => {
    const [auth, setAuth]:any = useState();
    useEffect(() => {
      const loginStatus = localStorage.getItem("token");
      setAuth(!!loginStatus);
      if (!loginStatus) {
        Router?.replace("/auth/login");
      }
    }, [auth]);
  return { auth };
};
 
