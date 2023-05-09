import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";

function Footer() {
  const useClasses = useStyle(classes);

  return (
    <footer aria-label="Site Footer" className="bg-white">
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <p className="text-sm">iService - 2023</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
