import Image from "next/image";
import React from "react";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

function BurgerButton({ open }: { open: boolean }) {
  if (open) {
    return <XMarkIcon className="w-6 h-6" />;
  } else {
    return <Bars3CenterLeftIcon className="w-6 h-6" />;
  }
}

export default BurgerButton;
