import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";

function ServiceCard({ title }: { title: string }) {
  const useClasses = useStyle(classes);

  return (
    <a className={useClasses.card} href="#">
      <div className={useClasses.wrapper}>
        <h3 className={useClasses.cardTitle}>{title}</h3>

        <p className={useClasses.cardSubtitle}>
          Encontre um profissional em sua região e agenda agora mesmo uma
          visita.
        </p>
      </div>
    </a>
  );
}

export default ServiceCard;
