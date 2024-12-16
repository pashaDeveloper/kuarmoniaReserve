

import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from './largeMenu/LargeMenu'; 
import MobileMenu from './largeMenu/MobileMenu'; 
import ProgressBar  from '@/components/shared/loading/ProgressBar'; 

const Navbar = () => {
 
  return (
    <header className="">
      <Container>
<ProgressBar  />
        <nav className="fixed top-0 left-0 right-0 shadow-lg flex flex-row justify-between items-center z-[9998] p-4 bg-white/80 dark:bg-black dark:text-gray-100">
        <UserMenu />
            <LargeMenu />
            <MobileMenu />
            <Logo />
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
