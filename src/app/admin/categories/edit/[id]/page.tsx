"use client";
import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter, usePathname, useParams } from "next/navigation";
import { isAdmin } from "@/services/checkRole";

function Edit() {
  const navigate = useRouter();
  if (!isAdmin()) navigate.back();

  const useClasses = useStyle(classes);
  const params = useParams();
  const pathname = usePathname();

  const handleSave = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    navigate.back();
  };

  return (
    <Layout title="Editar categoria" admin={true}>
      <form className={useClasses.form}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="name" className={useClasses.label}>
              Nome
            </label>
            <input name="name" type="text" className={useClasses.input} />
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
