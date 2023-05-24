"use client";

import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { isAdmin } from "@/services/checkRole";
import { useRouter } from "next/navigation";

function Categories() {
  const navigate = useRouter();
  if (!isAdmin()) navigate.back();

  const useClasses = useStyle(classes);

  const handleSave = () => {
    console.log("Chegou aqui");
  };

  return (
    <Layout title="Criar Categoria" admin={true}>
      <section>
        <div className={useClasses.inputGroup}>
          <label htmlFor="text" className={useClasses.label}>
            Nome
          </label>
          <input name="text" type="text" className={useClasses.input} />
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

export default Categories;
