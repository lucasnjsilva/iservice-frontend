import React from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";

const table = {
  head: ["Cliente", "Serviço", "Data de Solicitação", "Data de Agendamento"],
  body: [
    {
      id: "a1",
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
    <Layout title="Dashboard">
      <div className="mt-16">
        <h2 className={useClasses.sectionTitle}>Últimos clientes</h2>

        <Table table={table} />
      </div>
    </Layout>
  );
}

export default Dashboard;
