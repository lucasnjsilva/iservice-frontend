import React from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";

function Dashboard() {
  const useClasses = useStyle(classes);

  return (
    <Layout>
      <main>
        <h1>Dashboard</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          eligendi! Et inventore voluptas adipisci eum sint deserunt nesciunt
          impedit temporibus, eligendi sequi earum nemo. Officiis id beatae
          illum recusandae qui!
        </p>
      </main>
    </Layout>
  );
}

export default Dashboard;
