"use client";
import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter, useParams } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  const res = await fetch(`${API_HOST}/categories/${id}`, {
    headers: requestHeader,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function Edit() {
  const navigate = useRouter();
  const { id } = useParams();
  const useClasses = useStyle(classes);

  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("");

  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const request = await fetch(`${API_HOST}/categories/${id}`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify({ name: category }),
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      window.location.reload();

      return alert(
        "Ocorreu um erro ao tentar atualizar o nome da categoria, por favor, tente novamente."
      );
    }

    navigate.back();
  };

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getData(id).then(({ result }) => {
      setCategory(result.name);
    });
  }, [navigate, id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Editar categoria" admin={true}>
      <form className={useClasses.form} onSubmit={handleSave}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="name" className={useClasses.label}>
              Nome
            </label>
            <input
              name="name"
              type="text"
              className={useClasses.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

export default Edit;
