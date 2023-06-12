"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import Pagination from "@/components/Pagination";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import isAuthenticated from "@/services/isAuthenticated";
import useSWR from "swr";
import { requestHeader } from "@/services/api";
import { AttendanceStatus } from "@/utils/dictionaries";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = (url: string) =>
  fetch(url, { headers: requestHeader }).then((res) => res.json());

function Attendances() {
  const navigate = useRouter();
  const useClasses = useStyle(classes);

  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState({
    head: [
      "Profissional",
      "Cliente",
      "Serviço",
      "Data de Solicitação",
      "Data de Agendamento",
      "Status",
    ],
    body: [],
  });
  const [filter, setFilter] = useState({
    provider: "",
    customer: "",
    solicitationDate: "",
    attendanceDate: "",
    status: "",
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    perPage: 0,
    totalItems: 0,
  });

  const urlFilter1 = `provider=${filter.provider}&customer=${filter.customer}&solicitationDate=${filter.solicitationDate}`;
  const urlFilter2 = `attendanceDate=${filter.attendanceDate}&status=${filter.status}&page=${page}`;
  const url = `${API_HOST}/attendances?${urlFilter1}&${urlFilter2}`;
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
      provider: item.service.provider.name,
      customer: item.customer.name,
      service: item.service.name,
      solicitationDate: dateFormatter(item.solicitation_date),
      scheduleDate: dateFormatter(item.attendance_date),
      status: AttendanceStatus(item.status),
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

  const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    setFilter({
      provider: formValues.provider,
      customer: formValues.customer,
      solicitationDate: formValues.solicitationDate,
      attendanceDate: formValues.attendanceDate,
      status: formValues.status,
    });
  };

  return (
    <Layout title="Atendimentos" admin={true}>
      <form className={useClasses.filters} onSubmit={handleSearch}>
        <h4 className={useClasses.title}>Filtros</h4>
        <div className={useClasses.wrapper}>
          <input
            name="provider"
            type="text"
            placeholder="Profissional"
            className={useClasses.inputSearch}
          />

          <input
            name="customer"
            type="text"
            placeholder="Cliente"
            className={useClasses.inputSearch}
          />

          <input
            name="solicitationDate"
            type="text"
            placeholder="Data de Solicitação"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            className={useClasses.inputSearch}
          />

          <input
            name="attendanceDate"
            type="text"
            placeholder="Data de Atendimento"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            className={useClasses.inputSearch}
          />

          <select name="status" className={useClasses.inputSearch}>
            <option value="">Status</option>
            <option value="PENDING">Pendente</option>
            <option value="ATTENDED">Atendido</option>
            <option value="CANCELED_BY_PROVIDER">
              Cancelado pelo Prestador
            </option>
            <option value="CANCELED_BY_CUSTOMER">Cancelado pelo Cliente</option>
          </select>

          <button type="submit" className={useClasses.buttonSearch}>
            Pesquisar
          </button>
        </div>
      </form>

      <Table table={table} actions={false} />

      <Pagination
        page={page}
        setPage={setPage}
        perPage={pagination.perPage}
        totalItems={pagination.totalItems}
      />
    </Layout>
  );
}

export default Attendances;
