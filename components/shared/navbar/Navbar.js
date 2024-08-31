

import React from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from './largeMenu/LargeMenu'; 

const Navbar = () => {
  return (
    <header className="bg-secondary">
      <Container>
        <nav className="py-4">
          <section className="flex flex-row justify-between items-center">
            <LargeMenu />
            <UserMenu />
            <Logo />
          </section>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
