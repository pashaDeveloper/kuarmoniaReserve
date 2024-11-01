

import React from "react";
import Logo from "../../logo/Logo";

const FooterCopyright = () => {
  return (
    <section>
      <p className="text-sm text-center">
        © {new Date().getFullYear()} کلیه حقوق این اثر متعلق به مجموعه   <b>کارمونیا</b>  میباشد
      </p>
    </section>
  );
};

export default FooterCopyright;
