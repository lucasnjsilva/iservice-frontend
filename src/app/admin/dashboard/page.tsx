import React from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import StatsCard from "@/components/StatsCard";

function Dashboard() {
  const useClasses = useStyle(classes);

  return (
    <Layout title="Dashboard">
      <section>
        <h2 className={useClasses.sectionTitle}>
          Estatísticas Totais{" "}
          <span className="text-sm font-normal text-slate-500">
            (clique em algum card para ver mais)
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          <StatsCard label="Clientes" stats="200" />
          <StatsCard label="Prestadores" stats="500" />
          <StatsCard label="Categorias" stats="23" />
          <StatsCard label="Atendimentos" stats="133" />
        </div>
      </section>

      <div className="mt-16">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
        eligendi! Et inventore voluptas adipisci eum sint deserunt nesciunt
        impedit temporibus, eligendi sequi earum nemo. Officiis id beatae illum
        recusandae qui!
      </div>
    </Layout>
  );
}

export default Dashboard;
