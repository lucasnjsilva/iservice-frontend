"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import useSWR from "swr";
import Pagination from "@/components/Pagination";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = (url: string) =>
  fetch(url, { headers: requestHeader }).then((res) => res.json());

function Categories() {
  const navigate = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState({
    head: ["Nome"],
    body: [],
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    perPage: 0,
    totalItems: 0,
  });

  const url = `${API_HOST}/categories`;
  const useFetcher = useSWR(url, fetcher);

  const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

  const handleDelete = async (id: string) => {
    const request = await fetch(`${API_HOST}/categories/delete/${id}`, {
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

  if (isLoading) {
    return <div>Carregando...</div>;
  }

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

      <Pagination
        page={page}
        setPage={setPage}
        perPage={pagination.perPage}
        totalItems={pagination.totalItems}
      />
    </Layout>
  );
}

export default Categories;
