import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

function EvaluationCard({
  title,
  comment,
  star,
}: {
  title: string;
  comment: string;
  star: number;
}) {
  const useClasses = useStyle(classes);

  const filledStars = Array.from({ length: 5 }, (_, i) =>
    i < star ? (
      <StarSolidIcon key={i} width={16} height={16} />
    ) : (
      <StarOutlineIcon key={i} width={16} height={16} />
    )
  );

  return (
    <div className={useClasses.card}>
      <div className={useClasses.wrapper}>
        <div className="flex">{filledStars}</div>

        <h3 className={useClasses.cardTitle}>{title}</h3>
        <p className={useClasses.cardSubtitle}>{comment}</p>
      </div>
    </div>
  );
}

export default EvaluationCard;
