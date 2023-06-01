"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isCustomer } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

function Addresses() {
  const navigate = useRouter();
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isCustomer()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

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
