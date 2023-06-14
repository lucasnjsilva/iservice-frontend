"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/app/layouts/authenticated";
import Table from "@/components/Table";
import Pagination from "@/components/Pagination";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import { usePathname, useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import useSWR from "swr";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import InputMask from "react-input-mask";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetcher = (url: string) =>
  fetch(url, { headers: requestHeader }).then((res) => res.json());

const ufFetcher = (url: string) => fetch(url).then((res) => res.json());
const citiesFetcher = (url: string) => fetch(url).then((res) => res.json());

function Providers() {
  const navigate = useRouter();
  const useClasses = useStyle(classes);
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [table, setTable] = useState({
    head: ["Nome", "E-mail", "CNPJ", "Telefone", "Cidade", "Estado"],
    body: [],
  });
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    cnpj: "",
    phone: "",
    uf: "",
    city: "",
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    perPage: 0,
    totalItems: 0,
  });
  const [uf, setUf] = useState<string>();
  const [city, setCity] = useState<string>();

  const ufURL = "https://brasilapi.com.br/api/ibge/uf/v1";
  const useUFFetcher = useSWR(ufURL, ufFetcher);

  const citiesURL = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`;
  const useCitiesFetcher = useSWR(citiesURL, uf ? citiesFetcher : null);

  const urlFilter = `name=${filter.name}&email=${filter.email}&cnpj=${filter.cnpj}&phone=${filter.phone}&uf=${filter.uf}&city=${filter.city}&page=${page}`;
  const url = `${API_HOST}/providers?${urlFilter}`;
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
      cnpj: item.cnpj,
      phone: item.phone,
      city: item.city,
      uf: item.uf,
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
    const request = await fetch(`${API_HOST}/providers/delete/${id}`, {
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

    formValues.uf = uf || "";
    formValues.city = city || "";

    setFilter({
      name: formValues.name,
      email: formValues.email,
      cnpj: formValues.cnpj,
      phone: formValues.phone,
      uf: formValues.uf,
      city: formValues.city,
    });
  };

  const renderUFComponent = () => {
    if (useUFFetcher.error) return null;
    if (useUFFetcher.isLoading) return null;
    if (!useUFFetcher.data) return null;

    return useUFFetcher.data.map((item: any) => (
      <option key={item.id} value={item.sigla}>
        {item.nome}
      </option>
    ));
  };

  const renderCityComponent = () => {
    if (uf) {
      if (useCitiesFetcher.error) return null;
      if (useCitiesFetcher.isLoading) return null;
      if (!useCitiesFetcher.data) return null;

      return useCitiesFetcher.data.map((item: any) => (
        <option key={item.codigo_ibge} value={item.nome}>
          {item.nome}
        </option>
      ));
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Prestadores" admin={true}>
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

            <InputMask
              mask="99.999.999/9999-99"
              name="cnpj"
              placeholder="CNPJ"
              className={useClasses.inputSearch}
            />

            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              placeholder="Telefone"
              className={useClasses.inputSearch}
            />

            <select
              name="uf"
              value={uf}
              className={useClasses.inputSearch}
              onChange={(e) => setUf(e.target.value)}
            >
              <option value="">Selecione um...</option>
              {renderUFComponent()}
            </select>

            <div className={useClasses.inputGroup}>
              <input
                name="city"
                list="cities"
                placeholder="Cidades"
                className={useClasses.inputSearch}
                disabled={!uf}
                value={uf && city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              />
              <datalist id="cities">{renderCityComponent()}</datalist>
            </div>

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

export default Providers;
