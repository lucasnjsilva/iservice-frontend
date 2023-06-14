"use client";

import React, { useEffect, useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import CancelScheduleModal from "@/components/CancelScheduleModal";
import { getToken } from "@/services/isAuthenticated";
import useSWR from "swr";
import phoneFormatter from "@/utils/phoneFormatter";
import { AttendanceStatus } from "@/utils/dictionaries";
import Pagination from "@/components/Pagination";
import { requestHeader } from "@/services/api";
import EvaluationModal from "@/components/EvaluationModal";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

function CustomerDashboard() {
  const useClasses = useStyle(classes);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");
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
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    perPage: 0,
    totalItems: 0,
  });

  const url = `${API_HOST}/attendances`;
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

    setLastSchedules((prevState) => ({
      ...prevState,
      body,
    }));

    setPage(useFetcher.data.pagination.page);
    setPagination({
      perPage: useFetcher.data.pagination.perPage,
      totalItems: useFetcher.data.pagination.total,
    });
  }, [useFetcher.data, useFetcher.error, useFetcher.isLoading]);

  const handleModal = (id?: string) => {
    if (id) {
      setItemId(id);
    }

    setIsOpen(!isOpen);
  };

  const handleCancel = async (id: string) => {
    const payload = { status: "CANCELED_BY_CUSTOMER" };
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

  const handleConfirmEvaluation = async (payload: {
    vote: number;
    comment: string;
    attendanceId: string;
  }) => {
    const request = await fetch(`${API_HOST}/evaluations`, {
      method: "POST",
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

  const chooseModal = () => {
    if (itemId) {
      const item: any = lastSchedules.body.find(
        (obj: any) => obj.id === itemId
      );

      if (item) {
        if (item.status === "PENDENTE") {
          return (
            <CancelScheduleModal
              id={itemId}
              isOpen={isOpen}
              onCancel={handleCancel}
              onClose={handleModal}
            />
          );
        }

        if (item.status === "ATENDIDO") {
          return (
            <EvaluationModal
              id={itemId}
              isOpen={isOpen}
              onConfirm={handleConfirmEvaluation}
              onClose={handleModal}
            />
          );
        }
      }
    }
  };

  return (
    <>
      {chooseModal()}

      <Layout title="Dashboard">
        <div className="text-emerald-700">
          <p>
            Você pode cancelar um agendamento ou avaliar um atendimento clicando
            no botão editar na barra de ações na tabela.
          </p>
        </div>

        <div className="mt-16">
          <h2 className={useClasses.sectionTitle}>Últimos Agendamentos</h2>
          <Table
            table={lastSchedules}
            actions={{ view: false, edit: true, delete: false }}
            handleEdit={handleModal}
          />

          <Pagination
            page={page}
            setPage={setPage}
            perPage={pagination.perPage}
            totalItems={pagination.totalItems}
          />
        </div>
      </Layout>
    </>
  );
}

export default CustomerDashboard;
