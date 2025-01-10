

import React from "react";

const Container = ({ children, className }) => {
  return (
    <section
      className={
        " mx-auto px-primary" + (className ? ` ${className}` : ""+ "max-w-7xl") 
      }
    >
      {children}
    </section>
  );
};

export default Container;
