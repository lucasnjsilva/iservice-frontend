"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isProvider()) {
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

export default Services;
