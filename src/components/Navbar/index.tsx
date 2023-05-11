import React, { useEffect, useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Link from "next/link";
import BurgerButton from "./burgerButton";

export default function Navbar() {
  const useClasses = useStyle(classes);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const handleMenu = () => setOpen(!open);

  const detectScrolling = () => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScroll(currentScrollPos > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  };

  useEffect(() => detectScrolling(), []);

  return (
    <section
      className={scroll ? useClasses.section + " shadow" : useClasses.section}
    >
      <nav className={useClasses.nav}>
        {/* Desktop */}
        <div className={useClasses.container}>
          <div className={useClasses.brandContainer}>
            <Link href="/">
              <h1 className={useClasses.brand}>iService</h1>
            </Link>
          </div>

          <div className={useClasses.desktopButtonGroup}>
            <Link href="/signup">
              <button className={useClasses.desktopSignUpButton}>
                Cadastrar
              </button>
            </Link>

            <Link href="/signin">
              <button className={useClasses.desktopSignInButton}>Entrar</button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div onClick={handleMenu} className={useClasses.toggleMenu}>
            <BurgerButton open={open} />
          </div>
        </div>

        {/* Mobile */}
        <div className={`${open ? "block" : "hidden"} sm:hidden mt-12 mx-auto`}>
          <div className={useClasses.mobileButtonGroup}>
            <Link href="/signup">
              <button className={useClasses.mobileSignUpButton}>
                Cadastrar
              </button>
            </Link>

            <Link href="/signin">
              <button className={useClasses.mobileSignInButton}>Entrar</button>
            </Link>
          </div>
          <hr className="mt-12" />
        </div>
      </nav>
    </section>
  );
}
