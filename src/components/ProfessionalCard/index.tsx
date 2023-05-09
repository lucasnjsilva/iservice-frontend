import React from "react";
import Image from "next/image";
import classes from "./style";
import useStyle from "@/utils/cssHandler";

type PropsType = {
  name: string;
  profission: string;
  profile: string;
};

function ProfessionalCard({ name, profission, profile }: PropsType) {
  const useClasses = useStyle(classes);

  return (
    <div className={useClasses.card}>
      <div className="mb-8">
        <Image
          width={1000}
          height={1000}
          className={useClasses.image}
          src={profile}
          alt="photo"
        />
      </div>

      <div className="text-center">
        <p className={useClasses.title}>{name}</p>
        <p className={useClasses.subtitle}>{profission}</p>
      </div>
    </div>
  );
}

export default ProfessionalCard;
