"use client";
import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { usePathname, useParams } from "next/navigation";

function Edit() {
  const useClasses = useStyle(classes);
  const pathname = usePathname();
  const params = useParams();

  return (
    <Layout title="Editar cliente" admin={true}>
      <form className={useClasses.form}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="name" className={useClasses.label}>
              Nome
            </label>
            <input name="name" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="email" className={useClasses.label}>
              E-mail
            </label>
            <input name="email" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="cpf" className={useClasses.label}>
              CPF
            </label>
            <input
              name="cpf"
              type="text"
              className={useClasses.input}
              disabled
            />
          </div>

          <div>
            <label htmlFor="phone" className={useClasses.label}>
              Telefone
            </label>
            <input name="phone" type="text" className={useClasses.input} />
          </div>

          <button className={useClasses.button}>Salvar</button>
        </div>
      </form>
    </Layout>
  );
}

export default Edit;
