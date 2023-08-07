 
import React, { createContext, useReducer } from "react";
import { ModalContextType } from "../../lib/types/types";

export const GlobleContext = createContext<ModalContextType | undefined>(
  undefined
);

const initialState = {
  isOpen: false,
  modalTitle: "",
  hotelGroupsData: {},
  hotelGroupUpdate:{},
  hotelGroupAdd:{},
};

const reducer = (state:any, action:any) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, isOpen: true, modalTitle: action.payload };
    case "CLOSE_MODAL":
      return { ...state, isOpen: false, modalTitle: "" };
    case "SET_HOTEL_GROUPS_DATA":
      return { ...state, hotelGroupsData: action.payload };
      case "SET_HOTEL_GROUPS_UPDATE_DATA":
        return { ...state, hotelGroupUpdate: action.payload };
        case "SET_HOTEL_GROUPS_ADD_DATA":
          return { ...state, hotelGroupAdd: action.payload };
    default:
      return state;
  }
};

export const GlobleProvider = ({ children }) => {
  const [state, dispatch]:any = useReducer(reducer, initialState);
   const contextValue:any = { state, dispatch }
  return (
    <GlobleContext.Provider value={contextValue}>
      {children}
    </GlobleContext.Provider>
  );
};
