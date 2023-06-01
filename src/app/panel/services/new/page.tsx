"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

function NewService() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();

  const [isLoading, setIsLoading] = useState(true);

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

  const handleSave = () => {
    console.log("Chegou aqui");
  };

  return (
    <Layout title="Criar Serviço" admin={false}>
      <section>
        <div className={useClasses.inputGroup}>
          <label htmlFor="name" className={useClasses.label}>
            Nome
          </label>
          <input name="name" type="text" className={useClasses.input} />
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="category" className={useClasses.label}>
            Categoria
          </label>
          <input name="category" type="text" className={useClasses.input} />
        </div>

        <button
          type="button"
          className={useClasses.button}
          onClick={() => handleSave()}
        >
          Cadastrar
        </button>
      </section>
    </Layout>
  );
}

export default NewService;
