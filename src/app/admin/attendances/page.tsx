"use client";

import React, { useState } from "react";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import Pagination from "@/components/Pagination";
import useStyle from "@/utils/cssHandler";
import classes from "./style";

function Attendances() {
  const navigate = useRouter();

  if (!isAdmin()) navigate.back();

  const useClasses = useStyle(classes);
  const [search, setSearch] = useState<string>("");

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

  const handleSearch = () => {};

  return (
    <Layout title="Atendimentos" admin={true}>
      <section className={useClasses.filters}>
        <h4 className={useClasses.title}>Filtros</h4>
        <div className={useClasses.wrapper}>
          <input
            type="text"
            placeholder="Profissional"
            className={useClasses.inputSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Cliente"
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

          <button
            className={useClasses.buttonSearch}
            onClick={() => handleSearch()}
          >
            Pesquisar
          </button>
        </div>
      </section>

      <Table table={table} actions={false} />
      {/* <Pagination page={1} perPage={20} totalItems={5} /> */}
    </Layout>
  );
}

export default Attendances;
