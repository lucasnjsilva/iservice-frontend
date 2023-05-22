"use client";

import React from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";

function Providers() {
  const table = {
    head: [
      "Nome",
      "E-mail",
      "CNPJ",
      "Telefone",
      "Cidade",
      "Estado",
      "Criado em",
    ],
    body: [
      {
        id: "a1",
        name: "João",
        email: "example@email.com",
        cnpj: "30627230000146",
        phone: "(99) 99999-9999",
        city: "Pesqueira",
        uf: "PE",
        createdAt: dateFormatter("2023-05-20"),
      },
      {
        id: "a2",
        name: "Ronaldo",
        email: "example@email.com",
        cnpj: "30627230000146",
        phone: "(99) 99999-9999",
        city: "Pesqueira",
        uf: "PE",
        createdAt: dateFormatter("2023-05-20"),
      },
      {
        id: "a3",
        name: "Rose",
        email: "example@email.com",
        cnpj: "30627230000146",
        phone: "(99) 99999-9999",
        city: "Pesqueira",
        uf: "PE",
        createdAt: dateFormatter("2023-05-20"),
      },
    ],
  };

  const handleEdit = (id: string) => {
    return console.log(id);
  };

  const handleDelete = (id: string) => {
    return console.log(id);
  };

  return (
    <Layout title="Prestadores" admin={true}>
      <Table
        table={table}
        actions={true}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Layout>
  );
}

export default Providers;
