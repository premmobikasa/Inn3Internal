import Image from "next/image";
export const ImageAction = ({imgSrc}:any) => ( 
    <>
      <figure>
        <Image src={imgSrc} alt="logo" />
      </figure>
    </>
  );