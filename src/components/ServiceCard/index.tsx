import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";

function ServiceCard(props: { title: string; description: string }) {
  const { title, description } = props;
  const useClasses = useStyle(classes);

  return (
    <div className={useClasses.card}>
      <div className={useClasses.wrapper}>
        <h3 className={useClasses.cardTitle}>{title}</h3>
        <p className={useClasses.cardSubtitle}>{description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
