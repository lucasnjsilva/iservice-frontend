import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";

type PropTypes = {
  label: string;
  stats: number;
  link: string;
};

function StatsCard({ label, stats, link }: PropTypes) {
  const useClasses = useStyle(classes);

  return (
    <a href={link} className={useClasses.card}>
      <div className={useClasses.stats}>{stats}</div>
      <div className={useClasses.label}>{label}</div>
    </a>
  );
}

export default StatsCard;
