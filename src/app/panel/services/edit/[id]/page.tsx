"use client";
import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter, usePathname, useParams } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

function Edit() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const params = useParams();
  const pathname = usePathname();

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

  const handleSave = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    console.log("Salvou: ", params);
    navigate.back();
  };

  return (
    <Layout title="Editar serviço" admin={true}>
      <form className={useClasses.form}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="name" className={useClasses.label}>
              Nome
            </label>
            <input name="name" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="category" className={useClasses.label}>
              Categoria
            </label>
            <input name="category" type="text" className={useClasses.input} />
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
