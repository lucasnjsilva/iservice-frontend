"use client";

import React, { useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import StatusScheduleModal from "@/components/StatusScheduleModal";

const address = {
  address: "Av. Heraldo Gueiros",
  number: "322",
  neighborhood: "prado",
  complement: "Apto. 102",
  reference: "CAF Municipal",
  city: "Pesqueira",
  uf: "PE",
  cep: "55200-0000",
};

const tableLastSchedules = {
  head: [
    "Cliente",
    "Telefone",
    "Serviço",
    "Data de Solicitação",
    "Data de Agendamento",
    "Status",
  ],
  body: [
    {
      id: "a1",
      customer: "Tatiane Silva",
      phone: "(99) 99999-9999",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
      status: "PENDENTE",
    },
  ],
};

const tableLastCustomers = {
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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");

  const handleModal = (id?: string) => {
    if (id) {
      setItemId(id);
    }

    setIsOpen(!isOpen);
  };

  const handleConfirm = (id: string) => {
    console.log(id);
  };

  const handleRefuse = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <StatusScheduleModal
        id={itemId}
        isOpen={isOpen}
        onClose={handleModal}
        onConfirm={handleConfirm}
        onRefuse={handleRefuse}
      />

      <Layout title="Dashboard">
        <div className="mt-16">
          <h2 className={useClasses.sectionTitle}>Últimos Agendamentos</h2>
          <Table
            table={tableLastSchedules}
            actions={{
              view: false,
              edit: true,
              delete: false,
            }}
            handleEdit={handleModal}
          />
        </div>

        <div className="mt-24">
          <h2 className={useClasses.sectionTitle}>Últimos Clientes</h2>
          <Table table={tableLastCustomers} actions={false} />
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
