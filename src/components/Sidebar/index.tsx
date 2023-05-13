"use client";
import React, { useState, useContext } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import BurgerButton from "../BurgerButton";
import { SidebarContext } from "@/contexts/SidebarContext";

// type PropTypes = {
//   items: {
//     label: string;
//     icon: JSX.Element;
//     onClick: () => void;
//   }[];
// };

export default function Sidebar() {
  const useClasses = useStyle(classes);
  const [open, setOpen] = useContext(SidebarContext);

  const handleMenu = () => setOpen(!open);

  return (
    <>
      {/* Desktop */}
      <aside className={open ? useClasses.asideMobile : useClasses.aside}>
        <div className="flex">
          <p className={useClasses.brand}>iService</p>

          <div onClick={handleMenu} className={useClasses.toggleMenu}>
            <BurgerButton open={open} />
          </div>
        </div>

        <ul className={useClasses.menu}>
          <li className={useClasses.menuLink}>
            <a href="#">Dashboard</a>
          </li>
          <li className={useClasses.menuLink}>
            <a href="#">Administradores</a>
          </li>
          <li className={useClasses.menuLink}>
            <a href="#">Clientes</a>
          </li>
          <li className={useClasses.menuLink}>
            <a href="#">Prestadores</a>
          </li>
          <li className={useClasses.menuLink}>
            <a href="#">Categorias</a>
          </li>
          <li className={useClasses.menuLink}>
            <a href="#">Meus dados</a>
          </li>
          <li className={useClasses.menuLink}>
            <a href="#">Sair</a>
          </li>
        </ul>
      </aside>

      {/* Mobile */}
      <div className={open ? "hidden" : useClasses.mobileButtonGroup}>
        <div onClick={handleMenu} className={useClasses.toggleMenu}>
          <BurgerButton open={open} />
        </div>
      </div>
    </>
  );
}
