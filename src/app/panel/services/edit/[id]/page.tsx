"use client";
import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter, usePathname, useParams } from "next/navigation";
import { isProvider } from "@/services/checkRole";

function Edit() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const params = useParams();
  const pathname = usePathname();

  if (isProvider()) {
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

            <button
              className={useClasses.button}
              onClick={(e) => handleSave(e)}
            >
              Salvar
            </button>
          </div>
        </form>
      </Layout>
    );
  } else navigate.back();
}

export default Edit;
