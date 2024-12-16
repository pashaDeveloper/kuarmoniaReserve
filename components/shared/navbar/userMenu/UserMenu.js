

import React from "react";
import Search from "../searchTrio/Search";
import Cart from "../cart/Cart";
import Favorites from "../favorites/Favorites";
import MobileMenu from "../mobileMenu/MobileMenu";
import ToggleThemeButton from "@/components/shared/theme/ToggleThemeButton";
const UserMenu = () => {
  return (
    <div className="flex flex-row items-center gap-x-4 z-[9999] ">
      <Search />
      <Favorites />
      <Cart />
      <MobileMenu />
      <ToggleThemeButton />
    </div>
  );
};

export default UserMenu;
