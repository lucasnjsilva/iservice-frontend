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
import { requestHeader } from "@/services/api";
import useSWR from "swr";
import isAuthenticated from "@/services/isAuthenticated";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = (url: string) =>
  fetch(url, { headers: requestHeader }).then((res) => res.json());

function Customers() {
  const navigate = useRouter();
  const pathname = usePathname();
  const useClasses = useStyle(classes);

  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState({
    head: ["Nome", "E-mail", "CPF", "Telefone"],
    body: [],
  });
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    perPage: 0,
    totalItems: 0,
  });

  const url = `${API_HOST}/customers?name=${filter.name}&email=${filter.email}&phone=${filter.phone}&page=${page}`;
  const useFetcher = useSWR(url, fetcher);

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (
      useFetcher.error ||
      useFetcher.isLoading ||
      !useFetcher.data ||
      !useFetcher.data.result
    ) {
      return;
    }

    const body = useFetcher.data.result.map((item: any) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      cpf: item.cpf,
      phone: item.phone,
    }));

    setTable((prevState) => ({
      ...prevState,
      body,
    }));

    setPage(useFetcher.data.pagination.page);
    setPagination({
      perPage: useFetcher.data.pagination.perPage,
      totalItems: useFetcher.data.pagination.total,
    });
  }, [useFetcher.data, useFetcher.error, useFetcher.isLoading]);

  const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

  const handleDelete = async (id: string) => {
    const request = await fetch(`${API_HOST}/customers/delete/${id}`, {
      method: "PATCH",
      headers: requestHeader,
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      return alert(
        "Ocorreu um erro ao tentar deletar este serviço, por favor, tente novamente."
      );
    }

    return window.location.reload();
  };

  const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    setFilter({
      name: formValues.name,
      email: formValues.email,
      cpf: formValues.cpf,
      phone: formValues.phone,
    });
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Clientes" admin={true}>
      <main>
        <form className={useClasses.filters} onSubmit={handleSearch}>
          <h4 className={useClasses.title}>Filtros</h4>
          <div className={useClasses.wrapper}>
            <input
              name="name"
              type="text"
              placeholder="Nome"
              className={useClasses.inputSearch}
            />

            <input
              name="email"
              type="text"
              placeholder="E-mail"
              className={useClasses.inputSearch}
            />

            <input
              name="cpf"
              type="text"
              placeholder="CPF"
              className={useClasses.inputSearch}
            />

            <input
              name="phone"
              type="text"
              placeholder="Telefone"
              className={useClasses.inputSearch}
            />

            <button type="submit" className={useClasses.buttonSearch}>
              Pesquisar
            </button>
          </div>
        </form>

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

        <Pagination
          page={page}
          setPage={setPage}
          perPage={pagination.perPage}
          totalItems={pagination.totalItems}
        />
      </main>
    </Layout>
  );
}

export default Customers;
