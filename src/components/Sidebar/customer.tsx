import React, { useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import BurgerButton from "../BurgerButton";
import { customer } from "./menuItems";

function CustomerSidebar() {
  const useClasses = useStyle(classes);
  const [open, setOpen] = useState(false);

  const handleMenu = () => setOpen(!open);

  return (
    <>
      {/* Desktop */}
      <aside className={open ? useClasses.asideMobile : useClasses.aside}>
        <div className="px-4 py-6">
          <div className="flex">
            <p className={useClasses.brand}>iService</p>

            <div onClick={handleMenu} className={useClasses.toggleMenu}>
              <BurgerButton open={open} />
            </div>
          </div>

          <nav aria-label="Main Nav" className={useClasses.nav}>
            {customer.map((item, index) => {
              return (
                <a key={index} href={item.href} className={useClasses.menuLink}>
                  {item.icon}

                  <span className={useClasses.menuLinkText}>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
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

export default CustomerSidebar;
