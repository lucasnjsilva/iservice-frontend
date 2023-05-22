import React from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import StatsCard from "@/components/StatsCard";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";

const table = {
  head: [
    "Profissional",
    "Cliente",
    "Serviço",
    "Data de Solicitação",
    "Data de Agendamento",
  ],
  body: [
    {
      id: "a1",
      provider: "João Carlos",
      customer: "Tatiane Silva",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
    },
    {
      id: "a2",
      provider: "João Carlos",
      customer: "Tatiane Silva",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
    },
    {
      id: "a3",
      provider: "João Carlos",
      customer: "Tatiane Silva",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
    },
  ],
};

function Dashboard() {
  const useClasses = useStyle(classes);

  return (
    <Layout title="Dashboard" admin={true}>
      <section>
        <h2 className={useClasses.sectionTitle}>
          Estatísticas Totais
          <span className="text-sm font-normal text-slate-500">
            {" "}
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
        <h2 className={useClasses.sectionTitle}>Últimos negociações</h2>

        <Table table={table} actions={false} />
      </div>
    </Layout>
  );
}

export default Dashboard;
