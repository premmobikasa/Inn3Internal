import React from "react";
import { Button,} from "antd";

interface ButtonData { 
  type: any;
  htmlType: any;
  buttonClass: string;
  buttonName: string;
}

export const ActionButton = ({ 
  type,
  htmlType,
  buttonClass,
  buttonName,
}: ButtonData) => {
  return (
    <>
      <Button aria-label="button" type={type} htmlType={htmlType} className={buttonClass}>
        {buttonName}
      </Button>
    </>
  );
};
