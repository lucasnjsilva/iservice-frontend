"use client";

import React, { useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import StatusScheduleModal from "@/components/StatusScheduleModal";
import CancelScheduleModal from "@/components/CancelScheduleModal";
import Pagination from "@/components/Pagination";

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

function CustomerDashboard() {
  const useClasses = useStyle(classes);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");

  const handleModal = (id?: string) => {
    if (id) {
      setItemId(id);
    }

    setIsOpen(!isOpen);
  };

  const handleCancel = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <CancelScheduleModal
        id={itemId}
        isOpen={isOpen}
        onCancel={handleCancel}
        onClose={handleModal}
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

          {/* <Pagination page={1} perPage={10} totalItems={5} setPage={} /> */}
        </div>
      </Layout>
    </>
  );
}

export default CustomerDashboard;
