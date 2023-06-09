"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import { useRouter, usePathname } from "next/navigation";
import { isCustomer } from "@/services/checkRole";
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

function Addresses() {
  const navigate = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState({
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
    body: [],
  });

  const url = `${API_HOST}/customer_addresses`;
  const useFetcher = useSWR(url, fetcher);

  useEffect(() => {
    if (!isAuthenticated() || !isCustomer()) {
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
      address: item.address,
      number: item.number,
      complement: item.complement,
      neighborhood: item.neighborhood,
      reference: item.reference,
      city: item.city,
      uf: item.uf,
      cep: item.cep,
    }));

    setTable((prevState) => ({
      ...prevState,
      body,
    }));
  }, [useFetcher.data, useFetcher.error, useFetcher.isLoading]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const handleEdit = (id: string) => navigate.push(`${pathname}/edit/${id}`);

  const handleDelete = async (id: string) => {
    const request = await fetch(`${API_HOST}/customer_addresses/delete/${id}`, {
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
