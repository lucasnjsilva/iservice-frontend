import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";

function ServiceCard(props: { title: string; description: string }) {
  const { title, description } = props;
  const useClasses = useStyle(classes);

  return (
    <a className={useClasses.card} href="#">
      <div className={useClasses.wrapper}>
        <h3 className={useClasses.cardTitle}>{title}</h3>
        <p className={useClasses.cardSubtitle}>{description}</p>
      </div>
    </a>
  );
}

export default ServiceCard;
