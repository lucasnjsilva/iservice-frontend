import Image from "next/image";
import React from "react";

function BurgerButton({ open }: { open: boolean }) {
  if (open) {
    return (
      <Image
        src="assets/icons/close.svg"
        width={24}
        height={24}
        alt="Botão para fechar menu"
      />
    );
  } else {
    return (
      <Image
        src="assets/icons/burger.svg"
        width={24}
        height={24}
        alt="Botão para abrir menu"
      />
    );
  }
}

export default BurgerButton;
