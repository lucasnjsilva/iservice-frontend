"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import useSWR from "swr";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: requestHeader,
  });

  return response.json();
};

function Services() {
  const navigate = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState({
    head: ["Nome", "Categoria"],
    body: [],
  });

  const url = `${API_HOST}/services?my_services=true`;
  const useFetcher = useSWR(url, fetcher);

  useEffect(() => {
    if (!isAuthenticated() || !isProvider()) {
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
      category: item.category.name,
    }));

    setTable((prevState) => ({
      ...prevState,
      body,
    }));
  }, [useFetcher.data, useFetcher.error, useFetcher.isLoading]);

  const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

  const handleDelete = (id: string) => {
    return console.log(id);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

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
