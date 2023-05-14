import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";

type PropTypes = {
  label: string;
  stats: string;
};

function StatsCard({ label, stats }: PropTypes) {
  const useClasses = useStyle(classes);

  return (
    <div className={useClasses.card}>
      <div className={useClasses.stats}>{stats}</div>
      <div className={useClasses.label}>{label}</div>
    </div>
  );
}

export default StatsCard;
