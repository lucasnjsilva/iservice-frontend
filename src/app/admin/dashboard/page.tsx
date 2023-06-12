"use client";

import React, { useEffect, useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "@/app/layouts/authenticated";
import StatsCard from "@/components/StatsCard";
import Table from "@/components/Table";
import dateFormatter from "@/utils/dateFormatter";
import { isAdmin } from "@/services/checkRole";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import useSWR from "swr";
import phoneFormatter from "@/utils/phoneFormatter";
import { AttendanceStatus } from "@/utils/dictionaries";

const table = {
  head: [
    "Profissional",
    "Cliente",
    "Serviço",
    "Data de Solicitação",
    "Data de Agendamento",
  ],
  body: [
    {
      id: "a1",
      provider: "João Carlos",
      customer: "Tatiane Silva",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
    },
    {
      id: "a2",
      provider: "João Carlos",
      customer: "Tatiane Silva",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
    },
    {
      id: "a3",
      provider: "João Carlos",
      customer: "Tatiane Silva",
      service: "Mecânico",
      solicitationDate: dateFormatter("2023-05-12"),
      scheduleDate: dateFormatter("2023-05-13"),
    },
  ],
};

type StatsTypes = {
  customers: number;
  providers: number;
  categories: number;
  attendances: number;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getStats() {
  const customers = await fetch(`${API_HOST}/dashboard/total_customers`, {
    headers: requestHeader,
  });

  const providers = await fetch(`${API_HOST}/dashboard/total_providers`, {
    headers: requestHeader,
  });

  const categories = await fetch(`${API_HOST}/dashboard/total_categories`, {
    headers: requestHeader,
  });

  const attendances = await fetch(`${API_HOST}/dashboard/total_attendances`, {
    headers: requestHeader,
  });

  if (!customers.ok || !providers.ok || !categories.ok || !attendances.ok) {
    throw new Error("Failed to fetch data");
  }

  const totalCustomer = await customers.json();
  const totalProvider = await providers.json();
  const totalCategories = await categories.json();
  const totalAttendances = await attendances.json();

  return {
    customers: totalCustomer.result.total,
    providers: totalProvider.result.total,
    categories: totalCategories.result.total,
    attendances: totalAttendances.result.total,
  };
}

const fetcher = (url: string) =>
  fetch(url, { headers: requestHeader }).then((res) => res.json());

function Dashboard() {
  const navigate = useRouter();
  const useClasses = useStyle(classes);

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<StatsTypes>({
    customers: 0,
    providers: 0,
    categories: 0,
    attendances: 0,
  });
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

  const url = `${API_HOST}/attendances?limit=5`;
  const useFetcher = useSWR(url, fetcher);

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getStats().then(({ customers, providers, categories, attendances }) => {
      setStats({ customers, providers, categories, attendances });
    });
  }, []);

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
  }, [useFetcher.data, useFetcher.error, useFetcher.isLoading]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Dashboard" admin={true}>
      <section>
        <h2 className={useClasses.sectionTitle}>
          Estatísticas Totais
          <span className="text-sm font-normal text-slate-500">
            {" "}
            (clique em algum card para ver mais)
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          <StatsCard label="Clientes" stats={stats.customers} />
          <StatsCard label="Prestadores" stats={stats.providers} />
          <StatsCard label="Categorias" stats={stats.categories} />
          <StatsCard label="Atendimentos" stats={stats.attendances} />
        </div>
      </section>

      <div className="mt-16">
        <h2 className={useClasses.sectionTitle}>Últimos negociações</h2>

        <Table table={table} actions={false} />
      </div>
    </Layout>
  );
}

export default Dashboard;
