"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import Pagination from "@/components/Pagination";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { isAdmin } from "@/services/checkRole";

function Customers() {
  const navigate = useRouter();
  if (!isAdmin()) navigate.back();

  const useClasses = useStyle(classes);
  const pathname = usePathname();

  const [table, setTable] = useState<any>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setTable({
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
    });
  }, []);

  const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

  const handleDelete = (id: string) => {
    return console.log(id);
  };

  const handleSearch = () => {};

  const renderComponents = () => {
    if (table && table !== undefined) {
      return (
        <>
          <section className={useClasses.filters}>
            <h4 className={useClasses.title}>Filtros</h4>
            <div className={useClasses.wrapper}>
              <input
                type="text"
                placeholder="Nome"
                className={useClasses.inputSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <input
                type="text"
                placeholder="E-mail"
                className={useClasses.inputSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <input
                type="text"
                placeholder="CPF"
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

              <button
                className={useClasses.buttonSearch}
                onClick={() => handleSearch()}
              >
                Pesquisar
              </button>
            </div>
          </section>

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

          {/* <Pagination page={1} perPage={20} totalItems={50} /> */}
        </>
      );
    }
  };

  return (
    <Layout title="Clientes" admin={true}>
      <main>{renderComponents()}</main>
    </Layout>
  );
}

export default Customers;
