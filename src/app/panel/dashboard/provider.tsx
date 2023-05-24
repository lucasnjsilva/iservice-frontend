"use client";

import React, { useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import StatusScheduleModal from "@/components/StatusScheduleModal";

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
    {
      id: "a2",
      customer: "Tatiane Silva",
      phone: "(99) 99999-9999",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
      status: "PENDENTE",
    },
    {
      id: "a3",
      customer: "Tatiane Silva",
      phone: "(99) 99999-9999",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
      status: "PENDENTE",
    },
    {
      id: "a4",
      customer: "Tatiane Silva",
      phone: "(99) 99999-9999",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
      status: "PENDENTE",
    },
    {
      id: "a5",
      customer: "Tatiane Silva",
      phone: "(99) 99999-9999",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
      status: "PENDENTE",
    },
  ],
};

const tableTopServices = {
  head: ["Serviço", "Contratos"],
  body: [
    {
      id: "0",
      service: "Eletricista residencial",
      quantity: 20,
    },
    {
      id: "1",
      service: "Eletricista automotivo",
      quantity: 20,
    },
    {
      id: "2",
      service: "Eletricista empresarial",
      quantity: 20,
    },
    {
      id: "3",
      service: "Manutenção de computadores",
      quantity: 20,
    },
    {
      id: "4",
      service: "Técnico de informática",
      quantity: 20,
    },
  ],
};

function ProviderDashboard() {
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
          <h2 className={useClasses.sectionTitle}>
            Seus serviços mais buscados
          </h2>
          <Table table={tableTopServices} actions={false} />
        </div>
      </Layout>
    </>
  );
}

export default ProviderDashboard;
