"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { isCustomer } from "@/services/checkRole";
import { useRouter, useParams } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import useSWR from "swr";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  const res = await fetch(`${API_HOST}/customer_addresses/${id}`, {
    headers: requestHeader,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ufFetcher = (url: string) => fetch(url).then((res) => res.json());
const citiesFetcher = (url: string) => fetch(url).then((res) => res.json());

function EditAddress() {
  const navigate = useRouter();
  const { id } = useParams();
  const useClasses = useStyle(classes);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [uf, setUf] = useState<string>();
  const [city, setCity] = useState<string>();

  const ufURL = "https://brasilapi.com.br/api/ibge/uf/v1";
  const useUFFetcher = useSWR(ufURL, ufFetcher);

  const citiesURL = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`;
  const useCitiesFetcher = useSWR(citiesURL, uf ? citiesFetcher : null);

  useEffect(() => {
    if (!isAuthenticated() || !isCustomer()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getData(id).then(({ result }) => {
      setData(result);
      setUf(result.uf);
      setCity(result.city);
    });
  }, [navigate, id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

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

  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const request = await fetch(`${API_HOST}/customer_addresses/${id}`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(formValues),
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      window.location.reload();

      return alert(
        "Ocorreu um erro ao tentar atualizar seus dados, por favor, tente novamente."
      );
    }

    window.location.reload();
  };

  return (
    <Layout title="Editar endereço" admin={false}>
      <form className={useClasses.form} onSubmit={handleSave}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="address" className={useClasses.label}>
              Endereço*
            </label>
            <input
              required
              name="address"
              type="text"
              className={useClasses.input}
              value={data?.address || ""}
              onChange={(e) =>
                setData((prev: any) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          <div>
            <label htmlFor="number" className={useClasses.label}>
              Número
            </label>
            <input
              name="number"
              type="text"
              className={useClasses.input}
              value={data?.number || ""}
              onChange={(e) =>
                setData((prev: any) => ({ ...prev, number: e.target.value }))
              }
            />
          </div>

          <div>
            <label htmlFor="neighborhood" className={useClasses.label}>
              Bairro*
            </label>
            <input
              required
              name="neighborhood"
              type="text"
              className={useClasses.input}
              value={data?.neighborhood || ""}
              onChange={(e) =>
                setData((prev: any) => ({
                  ...prev,
                  neighborhood: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label htmlFor="complement" className={useClasses.label}>
              Complemento
            </label>
            <input
              name="complement"
              type="text"
              className={useClasses.input}
              value={data?.complement || ""}
              onChange={(e) =>
                setData((prev: any) => ({
                  ...prev,
                  complement: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <label htmlFor="reference" className={useClasses.label}>
              Referência
            </label>
            <input
              name="reference"
              type="text"
              className={useClasses.input}
              value={data?.reference || ""}
              onChange={(e) =>
                setData((prev: any) => ({ ...prev, reference: e.target.value }))
              }
            />
          </div>

          <div>
            <label htmlFor="uf" className={useClasses.label}>
              Estado*
            </label>
            <select
              required
              name="uf"
              value={uf}
              className={useClasses.inputSelect}
              onChange={(e) => setUf(e.target.value)}
            >
              <option value="">Selecione um...</option>
              {renderUFComponent()}
            </select>
          </div>

          <div>
            <label htmlFor="city" className={useClasses.label}>
              Cidade*
            </label>
            <input
              required
              name="city"
              list="cities"
              placeholder="Cidades"
              className={useClasses.input}
              disabled={!uf}
              value={uf && city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            />
            <datalist id="cities">{renderCityComponent()}</datalist>
          </div>

          <div>
            <label htmlFor="cep" className={useClasses.label}>
              CEP*
            </label>
            <input
              required
              name="cep"
              type="text"
              className={useClasses.input}
              value={data?.cep || ""}
              onChange={(e) =>
                setData((prev: any) => ({ ...prev, cep: e.target.value }))
              }
            />
          </div>

          <button type="submit" className={useClasses.button}>
            Salvar
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default EditAddress;
