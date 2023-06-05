"use client";
import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter, useParams } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import useSWR from "swr";
import { requestHeader } from "@/services/api";

interface IData {
  name: string;
  description: string;
  category: string;
  cost: string;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const categoryFetcher = (url: string) => fetch(url).then((res) => res.json());
const dataFetcher = (url: string) =>
  fetch(url, {
    headers: requestHeader,
  }).then((res) => res.json());

function Edit() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const { id } = useParams();

  const categoryURL = `${API_HOST}/categories`;
  const useCategoryFetcher = useSWR(categoryURL, categoryFetcher);

  const dataURL = `${API_HOST}/services/${id}`;
  const useDataFetcher = useSWR(dataURL, dataFetcher);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IData>({
    name: "",
    description: "",
    category: "",
    cost: "",
  });

  useEffect(() => {
    if (!isAuthenticated() || !isProvider()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (useDataFetcher.error) return;
    if (useDataFetcher.isLoading) return;
    if (!useDataFetcher.data) return;

    const result = useDataFetcher.data.result;

    setData({
      name: result.name,
      description: result.description,
      category: result.category.name,
      cost: result.cost,
    });
  }, [useDataFetcher.data, useDataFetcher.error, useDataFetcher.isLoading]);

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

  const handleSave = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const request = await fetch(`${API_HOST}/services/${id}`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(data),
    });

    const { error: requestError, result } = await request.json();

    if (requestError) {
      return alert(
        "Ocorreu um erro ao tentar deletar este serviço, por favor, tente novamente."
      );
    }

    return navigate.back();
  };

  return (
    <Layout title="Editar serviço" admin={false}>
      <form className={useClasses.form}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="name" className={useClasses.label}>
              Nome
            </label>
            <input
              name="name"
              type="text"
              placeholder="Serviço"
              className={useClasses.input}
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="description" className={useClasses.label}>
              Descrição
            </label>
            <input
              name="description"
              type="text"
              placeholder="Descrição"
              className={useClasses.input}
              value={data.description || ""}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="services" className={useClasses.label}>
              Categorias
            </label>

            <input
              list="categories"
              placeholder="Categorias"
              className={useClasses.input}
              value={data.category || ""}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            />
            <datalist id="categories">{renderCategoryComponent()}</datalist>
          </div>

          <div>
            <label htmlFor="cost" className={useClasses.label}>
              Custo
            </label>
            <input
              name="cost"
              type="text"
              placeholder="Custo"
              className={useClasses.input}
              value={data.cost || ""}
              onChange={(e) => setData({ ...data, cost: e.target.value })}
            />
          </div>

          <button className={useClasses.button} onClick={(e) => handleSave(e)}>
            Salvar
          </button>
        </div>
      </form>
    </Layout>
  );
}

export default Edit;
