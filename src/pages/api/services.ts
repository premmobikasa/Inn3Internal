import { createApolloClient } from "@/lib/apollo-client";
import { CREATE_HOTEL_GROUPS, DELETE_HOTEL_GROUPS, UPDATE_HOTEL_GROUPS } from "@/lib/graphqlOperation/operation";
import { useMutation } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {   useContext, useEffect, useState } from "react";
import { Notification } from "@/components/common/notification";
import { GlobleContext } from "@/components/common/modalContext";
 const {BASE_URL} = process.env;
 
export const useHotelGroupServices = (props:any,handleClose:any) => {
   const [accessToken, setAcessToken]: any = useState();
   const {dispatch }:any = useContext(GlobleContext);
   useEffect(() => {
        let token = localStorage.getItem("token");
        setAcessToken(token);
      }, [accessToken]); 
      const client = createApolloClient(accessToken);
      const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const [AddHotelGroups, { loading }] = useMutation(CREATE_HOTEL_GROUPS, {
    client,
    context: { authLink },
  });
  const [UpdateHotelGroups, { loading:LoadingData }] = useMutation(UPDATE_HOTEL_GROUPS, {
    client,
    context: { authLink },
  });
  const [DeleteHotelGroups, { loading:loadingdel }] = useMutation(DELETE_HOTEL_GROUPS, {
    client,
    context: { authLink },
  });
  const handleAddSubmit = async (e: any) => { 
    try {
     let {data}= await AddHotelGroups({
        variables: {
          name: e.HotelGroup,
          isActive: false,
        },
      });
      dispatch({ type: 'SET_HOTEL_GROUPS_ADD_DATA', payload: data });
      Notification("success", "Hotel group", "Add Successfully ");
      handleClose();
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    } catch (error: any) { 
      Notification("error", "Error", error?.message);
    }
  };
  const handleUpdateSubmit = async (e: any) => { 
    try {
    let {data}=  await UpdateHotelGroups({
        variables: {
          name: e?.HotelGroup, 
          id: props?.id, 
        },
      });  
      dispatch({ type: 'SET_HOTEL_GROUPS_UPDATE_DATA', payload: data });
      Notification("success", "Hotel group", "Edit Successfully ");
      handleClose(); 
    } catch (error: any) { 
      Notification("error", "Error", error?.message);
    }
  };
  const handleDeleteHotelGroups = async (id: any) => { 
    try {
     let res=   await DeleteHotelGroups({
        variables: { 
          id:id, 
        },
      });
      Notification("success", "Hotel group", res?.data?.deleteHotelGroup?.message);
      handleClose(); 
    } catch (error: any) { 
      Notification("error", "Error", error?.message);
    }
  };

  return  {
    handleUpdateSubmit ,
    handleAddSubmit,
    LoadingData,
    handleDeleteHotelGroups,
    loading 
   }
}