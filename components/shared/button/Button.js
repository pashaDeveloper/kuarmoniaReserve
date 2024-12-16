import React from "react";
import  MoonLoader   from "@/components/shared/loading/MoonLoaderLoading";

const Button = ({ children, className, isLoading, ...rest }) => {
  return (
    <button
      {...rest}
      className={
        "text-sm bg-primary/80 text-white rounded-secondary border-primary border-b-[5px] border-solid hover:bg-primary/90 hover:text-black transition-all delay-100" +
        ` ${className}`
      }
      disabled={isLoading} 
    >
      {isLoading ? (
        <>
       <MoonLoader  />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
