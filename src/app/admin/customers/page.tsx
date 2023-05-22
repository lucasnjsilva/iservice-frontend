"use client";

import React from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";

function Customers() {
  const table = {
    head: ["Nome", "E-mail", "CPF", "Telefone", "Criado em"],
    body: [
      {
        id: "a1",
        name: "Lucas",
        email: "example@email.com",
        cpf: "123.456.789-10",
        phone: "(99) 99999-9999",
        createdAt: dateFormatter("2023-05-20"),
      },
      {
        id: "a2",
        name: "Gisele",
        email: "example@email.com",
        cpf: "123.456.789-10",
        phone: "(99) 99999-9999",
        createdAt: dateFormatter("2023-05-20"),
      },
      {
        id: "a3",
        name: "Felipe",
        email: "example@email.com",
        cpf: "123.456.789-10",
        phone: "(99) 99999-9999",
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
    <Layout title="Clientes" admin={true}>
      <Table
        table={table}
        actions={true}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Layout>
  );
}

export default Customers;
