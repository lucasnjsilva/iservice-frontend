"use client";

import React from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";

function Categories() {
  const table = {
    head: ["Nome"],
    body: [
      {
        id: "a1",
        name: "Mecânico",
      },
      {
        id: "a2",
        name: "Pintor",
      },
      {
        id: "a3",
        name: "Eletricista",
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
    <Layout title="Categorias" admin={true}>
      <Table
        table={table}
        actions={true}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Layout>
  );
}

export default Categories;
