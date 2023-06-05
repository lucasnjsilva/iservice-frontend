import React, { useEffect, useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Link from "next/link";
import BurgerButton from "../BurgerButton";
import isAuthenticated from "@/services/isAuthenticated";
import useLocalStorage from "@/utils/useLocalStorage";
import { useRouter } from "next/navigation";
import { UserType } from "@/interfaces/IUser";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export default function Navbar() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isLogged, setIsLogged] = useState<boolean>();
  const [role, setRole] = useState<string>();

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
  useEffect(() => {
    const UserData: UserType | null = useLocalStorage.get("user");
    if (UserData && UserData.role) {
      setRole(UserData.role);
    }

    return isAuthenticated() ? setIsLogged(true) : setIsLogged(false);
  }, []);

  const handleSignout = async () => {
    const UserData: UserType | null = useLocalStorage.get("user");

    if (UserData && UserData.token) {
      const fetcher = await fetch(`${API_HOST}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${UserData.token}`,
        },
      });

      const response = await fetcher.json();

      if (response && response.status === "OK") {
        useLocalStorage.remove("user");
        window.location.reload();
      }
    }
  };

  const renderDesktopGuestButtons = () => (
    <>
      <Link href="/signup">
        <button className={useClasses.desktopSignUpButton}>Cadastrar</button>
      </Link>

      <Link href="/signin">
        <button className={useClasses.desktopSignInButton}>Entrar</button>
      </Link>
    </>
  );

  const renderDesktopButtons = () => (
    <>
      <Link
        href={
          role === "PROVIDER" || role === "CUSTOMER"
            ? "/panel/dashboard"
            : "/admin/dashboard"
        }
      >
        <button>Painel de Controle</button>
      </Link>

      <button onClick={handleSignout}>Sair</button>
    </>
  );

  const renderMobileGuestButtons = () => (
    <>
      <Link href="/signup">
        <button className={useClasses.mobileSignUpButton}>Cadastrar</button>
      </Link>

      <Link href="/signin">
        <button className={useClasses.mobileSignInButton}>Entrar</button>
      </Link>
    </>
  );

  const renderMobileButtons = () => (
    <>
      <Link
        href={
          role === "PROVIDER" || role === "CUSTOMER"
            ? "/panel/dashboard"
            : "/admin/dashboard"
        }
      >
        <button>Painel de Controle</button>
      </Link>

      <button onClick={handleSignout}>Sair</button>
    </>
  );

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
            {isLogged ? renderDesktopButtons() : renderDesktopGuestButtons()}
          </div>

          {/* Mobile Toggle */}
          <div onClick={handleMenu} className={useClasses.toggleMenu}>
            <BurgerButton open={open} />
          </div>
        </div>

        {/* Mobile */}
        <div className={`${open ? "block" : "hidden"} sm:hidden mt-12 mx-auto`}>
          <div className={useClasses.mobileButtonGroup}>
            {isLogged ? renderMobileButtons() : renderMobileGuestButtons()}
          </div>
          <hr className="mt-12" />
        </div>
      </nav>
    </section>
  );
}
