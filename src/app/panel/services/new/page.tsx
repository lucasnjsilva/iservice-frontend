"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import useSWR from "swr";
import { requestHeader } from "@/services/api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const categoryFetcher = (url: string) => fetch(url).then((res) => res.json());

function NewService() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();

  const categoryURL = `${API_HOST}/categories`;
  const useCategoryFetcher = useSWR(categoryURL, categoryFetcher);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    if (!isAuthenticated() || !isProvider()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const renderCategoryComponent = () => {
    if (useCategoryFetcher.error) return null;
    if (useCategoryFetcher.isLoading) return null;
    if (!useCategoryFetcher.data) return null;

    return useCategoryFetcher.data.result.map((item: any) => (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    ));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    formValues["category"] = category || "";
    formData.append("category", category || "");

    const options = {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(formValues),
    };

    if (
      !formValues.name ||
      !formValues.description ||
      !formValues.category ||
      !formValues.cost
    ) {
      setError(
        "Você precisa preencher as informações para fazer cadastrar um novo serviço."
      );
    }

    const request = await fetch(`${API_HOST}/services`, options);

    const { error: requestError, result } = await request.json();

    if (requestError && requestError.code === "VALIDATION_ERROR") {
      return setError(
        "Verifique as informações preenchidas e tente novamente."
      );
    }

    navigate.push("/panel/services");
  };

  return (
    <Layout title="Criar Serviço" admin={false}>
      <form onSubmit={handleSave}>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <div className={useClasses.inputGroup}>
          <label htmlFor="name" className={useClasses.label}>
            Nome
          </label>
          <input
            name="name"
            type="text"
            className={useClasses.input}
            required
          />
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="description" className={useClasses.label}>
            Descrição
          </label>
          <input
            name="description"
            type="text"
            placeholder="Descrição"
            className={useClasses.input}
            required
          />
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="services" className={useClasses.label}>
            Categorias
          </label>

          <input
            list="categories"
            placeholder="Categorias"
            className={useClasses.input}
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <datalist id="categories">{renderCategoryComponent()}</datalist>
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="cost" className={useClasses.label}>
            Custo
          </label>
          <input
            name="cost"
            type="text"
            placeholder="Custo"
            className={useClasses.input}
            required
          />
        </div>

        <button type="submit" className={useClasses.button}>
          Cadastrar
        </button>
      </form>
    </Layout>
  );
}

export default NewService;
