"use client";

import React from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";

function Addresses() {
  const router = useRouter();
  const pathname = usePathname();
  const table = {
    head: [
      "Endereço",
      "Número",
      "Complemento",
      "Bairro",
      "Referência",
      "Cidade",
      "Estado",
      "CEP",
    ],
    body: [
      {
        id: "a1",
        address: "Av. Heraldo Gueiros",
        number: "322",
        complement: "Apto. 102",
        neighborhood: "Prado",
        reference: "CAF MUnicipal",
        city: "Pesqueira",
        uf: "PE",
        cep: "55200-000",
      },
    ],
  };

  const handleEdit = (id: string) => router.push(`${pathname}/edit/${id}`);

  const handleDelete = (id: string) => {
    return console.log(id);
  };

  return (
    <Layout title="Endereços" admin={false}>
      <Table
        table={table}
        actions={{
          view: false,
          edit: true,
          delete: true,
        }}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Layout>
  );
}

export default Addresses;
