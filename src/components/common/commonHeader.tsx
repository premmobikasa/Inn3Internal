import Image from 'next/image'
import React from 'react'
import buttonImage from "../../../public/assets/images/Vector.svg";

interface HeaderValue  {
   title:string,
   button_text:string,
   handleClick:() =>void
}

export const HeaderSection = ({title,button_text,handleClick}:HeaderValue) => { 
  return (
    <div className="headersection-wrap">
        <h2 className="title">{title}</h2>
        <button className="add-btn" onClick={handleClick}>
           <Image src={buttonImage} alt='button image'/>
          <span>{button_text}</span></button>
    </div>
  )
}
 