"use client";

import React, { useEffect, useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import StatusScheduleModal from "@/components/StatusScheduleModal";
import useSWR from "swr";
import { getToken } from "@/services/isAuthenticated";
import { AttendanceStatus } from "@/utils/dictionaries";
import phoneFormatter from "@/utils/phoneFormatter";
import { requestHeader } from "@/services/api";
import { useRouter } from "next/navigation";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.json();
};

function ProviderDashboard() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState("");

  const [lastSchedules, setLastSchedules] = useState({
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
  const [topServices, setTopServices] = useState({
    head: ["Serviço", "Contratos"],
    body: [],
  });

  const lastSchedulesUrl = `${API_HOST}/attendances?limit=5`;
  const useLastSchedulesFetcher = useSWR(lastSchedulesUrl, fetcher);

  const topServicesUrl = `${API_HOST}/attendances/contracts_by_service`;
  const useTopServicesFetcher = useSWR(topServicesUrl, fetcher);

  useEffect(() => {
    if (
      useLastSchedulesFetcher.error ||
      useLastSchedulesFetcher.isLoading ||
      !useLastSchedulesFetcher.data ||
      !useLastSchedulesFetcher.data.result
    ) {
      return;
    }

    const body = useLastSchedulesFetcher.data.result.map((item: any) => ({
      id: item.id,
      customer: item.customer.name,
      phone: phoneFormatter(item.customer.phone),
      service: item.service.category.name,
      solicitationDate: dateFormatter(item.solicitation_date),
      scheduleDate: dateFormatter(item.attendance_date),
      status: AttendanceStatus(item.status),
    }));

    setLastSchedules((prevState) => ({
      ...prevState,
      body,
    }));
  }, [
    useLastSchedulesFetcher.data,
    useLastSchedulesFetcher.error,
    useLastSchedulesFetcher.isLoading,
  ]);

  useEffect(() => {
    if (
      useTopServicesFetcher.error ||
      useTopServicesFetcher.isLoading ||
      !useTopServicesFetcher.data ||
      !useTopServicesFetcher.data.result
    ) {
      return;
    }

    const body = Object.entries(useTopServicesFetcher.data.result).map(
      ([service, attendances], index) => ({
        id: String(index),
        service,
        attendances,
      })
    );

    setTopServices((prevState: any) => ({
      ...prevState,
      body,
    }));
  }, [
    useTopServicesFetcher.data,
    useTopServicesFetcher.error,
    useTopServicesFetcher.isLoading,
  ]);

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

    if (response.error) {
      alert(
        "Ocorreu um erro ao tentar confirmar seu atendimento. Por favor, tente novamente."
      );
    } else {
      navigate.push("/panel/dashboard");
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

    if (response.status === "OK") navigate.push("/panel/dashboard");

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

      <Layout title="Dashboard">
        <div className="mt-16">
          <h2 className={useClasses.sectionTitle}>Últimos Agendamentos</h2>
          <Table
            table={lastSchedules}
            actions={{ view: false, edit: true, delete: false }}
            handleEdit={handleModal}
          />
        </div>

        <div className="mt-24">
          <h2 className={useClasses.sectionTitle}>
            Seus serviços mais buscados
          </h2>
          <Table table={topServices} actions={false} />
        </div>
      </Layout>
    </>
  );
}

export default ProviderDashboard;
