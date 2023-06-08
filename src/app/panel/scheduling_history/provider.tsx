"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import dateFormatter from "@/utils/dateFormatter";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { requestHeader } from "@/services/api";
import useSWR from "swr";
import phoneFormatter from "@/utils/phoneFormatter";
import { AttendanceStatus } from "@/utils/dictionaries";
import StatusScheduleModal from "@/components/StatusScheduleModal";

type SearchType = {
  customer: string;
  phone: string;
  service: string;
  solicitationDate: string;
  attendanceDate: string;
  status: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: requestHeader,
  });

  return response.json();
};

async function getServices() {
  const response = await fetch(`${API_HOST}/services?my_services=true`, {
    headers: requestHeader,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

function ProviderHistory() {
  const useClasses = useStyle(classes);

  const [table, setTable] = useState({
    head: [
      "Cliente",
      "Telefone",
      "Serviço",
      "Data de Solicitação",
      "Data de Agendamento",
      "Status",
    ],
    body: [],
  });
  const [services, setServices] = useState<any>();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    perPage: 0,
    totalItems: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const url = `${API_HOST}/attendances?page=${page}`;
  const useFetcher = useSWR(url, fetcher);

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
      customer: item.customer.name,
      phone: phoneFormatter(item.customer.phone),
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

  useEffect(() => {
    getServices().then(({ result }) => setServices(result));
  }, []);

  const renderServiceOptions = () => {
    if (services) {
      return services.map((item: any) => (
        <option key={item.id} value={item.name}>
          {item.name}
        </option>
      ));
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const filterCustomer = `customer=${encodeURI(formValues.customer)}`;
    const filterPhone = `phone=${encodeURI(formValues.phone)}`;
    const filterService = `service=${encodeURI(formValues.service)}`;
    const filterSolicitation = `solicitationDate=${formValues.solicitationDate}`;
    const filterAttendance = `attendanceDate=${formValues.attendanceDate}`;
    const filterStatus = `status=${formValues.status}`;

    const filters = `${filterCustomer}&${filterPhone}&${filterService}&${filterSolicitation}&${filterAttendance}&${filterStatus}&page=${page}`;

    const request = await fetch(`${API_HOST}/attendances?${filters}`, {
      headers: requestHeader,
    });

    const response = await request.json();

    const body = response.result.map((item: any) => ({
      id: item.id,
      customer: item.customer.name,
      phone: phoneFormatter(item.customer.phone),
      service: item.service.name,
      solicitationDate: dateFormatter(item.solicitation_date),
      scheduleDate: dateFormatter(item.attendance_date),
      status: AttendanceStatus(item.status),
    }));

    setTable((prevState) => ({
      ...prevState,
      body,
    }));

    setPage(response.pagination.page);
    setPagination({
      perPage: response.pagination.perPage,
      totalItems: response.pagination.total,
    });
  };

  const handleModal = (id?: string) => {
    if (id) {
      setItemId(id);
    }

    setIsOpen((prevState) => !prevState);
  };

  const handleConfirm = async (id: string) => {
    const payload = { status: "ATTENDED" };
    const request = await fetch(`${API_HOST}/attendances/${id}`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(payload),
    });

    const response = await request.json();

    if (response.status === "OK") window.location.reload();

    if (response.error) {
      alert(
        "Ocorreu um erro ao tentar confirmar seu atendimento. Por favor, tente novamente."
      );
    }
  };

  const handleRefuse = async (id: string) => {
    const payload = { status: "CANCELED_BY_PROVIDER" };
    const request = await fetch(`${API_HOST}/attendances/${id}`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(payload),
    });

    const response = await request.json();

    if (response.status === "OK") window.location.reload();

    if (response.error) {
      alert(
        "Ocorreu um erro ao tentar confirmar seu atendimento. Por favor, tente novamente."
      );
    }
  };

  return (
    <>
      <StatusScheduleModal
        id={itemId}
        isOpen={isOpen}
        onClose={handleModal}
        onConfirm={handleConfirm}
        onRefuse={handleRefuse}
      />

      <Layout title="Histórico de agendamentos" admin={false}>
        <section className={useClasses.filters}>
          <h4 className={useClasses.title}>Filtros</h4>
          <form className={useClasses.wrapper} onSubmit={handleSearch}>
            <input
              name="customer"
              type="text"
              placeholder="Cliente"
              className={useClasses.inputSearch}
            />

            <input
              name="phone"
              type="text"
              placeholder="Telefone"
              className={useClasses.inputSearch}
            />

            <select name="service" className={useClasses.inputSearch}>
              <option value="">Serviço</option>
              {renderServiceOptions()}
            </select>

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
              <option value="CANCELED_BY_CUSTOMER">
                Cancelado pelo Cliente
              </option>
            </select>

            <button className={useClasses.buttonSearch} type="submit">
              Pesquisar
            </button>
          </form>
        </section>

        <Table
          table={table}
          actions={{ view: false, edit: true, delete: false }}
          handleEdit={handleModal}
        />

        <Pagination
          page={page}
          setPage={setPage}
          perPage={pagination.perPage}
          totalItems={pagination.totalItems}
        />
      </Layout>
    </>
  );
}

export default ProviderHistory;
