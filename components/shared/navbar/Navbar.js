

import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from './largeMenu/LargeMenu'; 
import MobileMenu from './largeMenu/MobileMenu'; 

const Navbar = () => {
  return (
    <header className="bg-secondary">
      <Container>
        <nav className="py-4">
          <section className="flex flex-row justify-between items-center">
            <UserMenu />
            <LargeMenu />
            <MobileMenu />
            <Logo />
          </section>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
