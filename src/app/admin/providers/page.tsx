"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import Pagination from "@/components/Pagination";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { usePathname, useRouter } from "next/navigation";

function Providers() {
  const useClasses = useStyle(classes);
  const pathname = usePathname();
  const router = useRouter();

  const [table, setTable] = useState<any>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setTable({
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
    });
  }, []);

  const handleEdit = (id: string) => router.push(`${pathname}/edit/${id}`);

  const handleDelete = (id: string) => {
    return console.log(id);
  };

  const handleSearch = () => {
    if (search !== "" && table) {
      const isMatchFound = table.body.some((obj: any) => {
        const values = Object.values(obj);

        return values.some((value) => {
          if (typeof value === "string") {
            const isString = value.toLowerCase().includes(search.toLowerCase());
            return isString;
          }

          return false;
        });
      });

      console.log(isMatchFound);
    }
  };

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
                placeholder="CNPJ"
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

              <input
                type="text"
                placeholder="Cidade"
                className={useClasses.inputSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <input
                type="text"
                placeholder="Estado"
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
            actions={true}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />

          <Pagination page={1} perPage={20} totalItems={50} />
        </>
      );
    }
  };

  return (
    <Layout title="Prestadores" admin={true}>
      <main>{renderComponents()}</main>
    </Layout>
  );
}

export default Providers;
