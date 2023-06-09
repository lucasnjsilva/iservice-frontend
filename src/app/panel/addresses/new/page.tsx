"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isCustomer } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import useSWR from "swr";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const ufFetcher = (url: string) => fetch(url).then((res) => res.json());
const citiesFetcher = (url: string) => fetch(url).then((res) => res.json());

function NewAddress() {
  const navigate = useRouter();
  const useClasses = useStyle(classes);
  const [isLoading, setIsLoading] = useState(true);

  const [uf, setUf] = useState<string>("");
  const [city, setCity] = useState<string>("");

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

    formValues.uf = uf;
    formValues.city = city;

    const request = await fetch(`${API_HOST}/customer_addresses`, {
      method: "POST",
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

    navigate.push("/panel/addresses");
  };

  return (
    <Layout title="Endereços" admin={false}>
      <form className={useClasses.form} onSubmit={handleSave}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="address" className={useClasses.label}>
              Endereço
            </label>
            <input
              name="address"
              type="text"
              className={useClasses.input}
              required
            />
          </div>

          <div>
            <label htmlFor="number" className={useClasses.label}>
              Número
            </label>
            <input name="number" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="neighborhood" className={useClasses.label}>
              Bairro
            </label>
            <input
              name="neighborhood"
              type="text"
              className={useClasses.input}
              required
            />
          </div>

          <div>
            <label htmlFor="complement" className={useClasses.label}>
              Complemento
            </label>
            <input name="complement" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="reference" className={useClasses.label}>
              Referência
            </label>
            <input name="reference" type="text" className={useClasses.input} />
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
              CEP
            </label>
            <input
              name="cep"
              type="text"
              className={useClasses.input}
              required
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

export default NewAddress;
