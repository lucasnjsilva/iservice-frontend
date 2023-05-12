import React from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Sidebar from "@/components/Sidebar";

function Dashboard() {
  const useClasses = useStyle(classes);

  return (
    <>
      <Sidebar />
      <main className="pl-64 p-16 pt-8 w-full">
        <h1>Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          eligendi! Et inventore voluptas adipisci eum sint deserunt nesciunt
          impedit temporibus, eligendi sequi earum nemo. Officiis id beatae
          illum recusandae qui!
        </p>
      </main>
    </>
  );
}

export default Dashboard;
