"use client";

import React from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isAdmin, isCustomer, isProvider } from "@/services/checkRole";

function Services() {
  const navigate = useRouter();
  const pathname = usePathname();
  const table = {
    head: ["Nome", "Categoria"],
    body: [
      {
        id: "a1",
        name: "Mecânico automotivo",
        category: "Mecânico",
      },
      {
        id: "a2",
        name: "Pintura automotiva",
        category: "Pintor",
      },
      {
        id: "a3",
        name: "Eletricista automotivo",
        category: "Eletricista",
      },
    ],
  };

  if (isAdmin() || isCustomer()) navigate.back();

  if (isProvider()) {
    const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

    const handleDelete = (id: string) => {
      return console.log(id);
    };

    return (
      <Layout title="Serviços" admin={false}>
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
}

export default Services;
