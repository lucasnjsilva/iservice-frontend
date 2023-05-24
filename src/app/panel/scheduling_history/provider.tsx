"use client";

import React, { useState } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import dateFormatter from "@/utils/dateFormatter";
import useStyle from "@/utils/cssHandler";
import classes from "./style";

function ProviderHistory() {
  const useClasses = useStyle(classes);
  const [search, setSearch] = useState<string>("");

  const table = {
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

  const handleSearch = () => {
    if (search !== "" && table) {
      const isMatchFound = table.body.some((obj: any) => {
        const values = Object.values(obj);

        return values.some((value) => {
          if (typeof value === "string") {
            const isString = value.toLowerCase().includes(search.toLowerCase());
            return isString;
          }

          return false;
        });
      });

      console.log(isMatchFound);
    }
  };

  return (
    <Layout title="Histórico de agendamentos" admin={false}>
      <section className={useClasses.filters}>
        <h4 className={useClasses.title}>Filtros</h4>
        <div className={useClasses.wrapper}>
          <input
            type="text"
            placeholder="Cliente"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Serviço"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Data de Solicitação"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Data de Agendamento"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Status"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className={useClasses.buttonSearch}
            onClick={() => handleSearch()}
          >
            Pesquisar
          </button>
        </div>
      </section>

      <Table table={table} actions={false} />
      <Pagination page={1} perPage={20} totalItems={5} />
    </Layout>
  );
}

export default ProviderHistory;
