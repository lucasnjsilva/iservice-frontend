"use client";

import React from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isAdmin } from "@/services/checkRole";

function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const navigate = useRouter();
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

  if (isAdmin()) {
    const handleEdit = (id: string) => router.push(`${pathname}/edit/${id}`);

    const handleDelete = (id: string) => {
      return console.log(id);
    };

    return (
      <Layout title="Categorias" admin={true}>
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
  } else {
    navigate.back();
  }
}

export default Categories;
