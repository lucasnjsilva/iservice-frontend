"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { isAdmin } from "@/services/checkRole";
import { useRouter } from "next/navigation";
import { requestHeader } from "@/services/api";
import isAuthenticated from "@/services/isAuthenticated";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function Categories() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  const useClasses = useStyle(classes);

  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const request = await fetch(`${API_HOST}/categories/`, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(formValues),
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      window.location.reload();

      return alert(
        "Ocorreu um erro ao tentar cadastrar uma nova categoria, por favor, tente novamente."
      );
    }

    navigate.back();
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Criar Categoria" admin={true}>
      <form onSubmit={handleSave}>
        <div className={useClasses.inputGroup}>
          <label htmlFor="name" className={useClasses.label}>
            Nome
          </label>
          <input name="name" type="text" className={useClasses.input} />
        </div>

        <button type="submit" className={useClasses.button}>
          Cadastrar
        </button>
      </form>
    </Layout>
  );
}

export default Categories;
