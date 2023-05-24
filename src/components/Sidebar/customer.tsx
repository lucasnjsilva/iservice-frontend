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
              if (item.items) {
                return (
                  <details key={index} className={useClasses.menuSelect}>
                    <summary className={useClasses.menuOption}>
                      <div className="flex items-center gap-2">
                        {item.icon}

                        <span className={useClasses.menuLinkText}>
                          {item.label}
                        </span>
                      </div>

                      <span className={useClasses.menuSelectIcon}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </summary>

                    <nav className={useClasses.menuSelectNav}>
                      {item.items.map((i, index) => (
                        <a
                          key={index}
                          href={i.href}
                          className={useClasses.menuLink}
                        >
                          {i.icon}

                          <span className={useClasses.menuLinkText}>
                            {i.label}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </details>
                );
              }

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
