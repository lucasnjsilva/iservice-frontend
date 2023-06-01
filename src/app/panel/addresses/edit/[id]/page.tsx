"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { isCustomer } from "@/services/checkRole";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";

function EditAddress() {
  const navigate = useRouter();
  const useClasses = useStyle(classes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isCustomer()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Editar endereço" admin={false}>
      <form className={useClasses.form}>
        <div className={useClasses.formGroup}>
          <div>
            <label htmlFor="address" className={useClasses.label}>
              Endereço
            </label>
            <input name="address" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="number" className={useClasses.label}>
              Número
            </label>
            <input name="number" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="neighborhood" className={useClasses.label}>
              Bairro
            </label>
            <input
              name="neighborhood"
              type="text"
              className={useClasses.input}
            />
          </div>

          <div>
            <label htmlFor="complement" className={useClasses.label}>
              Complemento
            </label>
            <input name="complement" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="reference" className={useClasses.label}>
              Referência
            </label>
            <input name="reference" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="city" className={useClasses.label}>
              Cidade
            </label>
            <input name="city" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="uf" className={useClasses.label}>
              Estado
            </label>
            <input name="uf" type="text" className={useClasses.input} />
          </div>

          <div>
            <label htmlFor="cep" className={useClasses.label}>
              CEP
            </label>
            <input name="cep" type="text" className={useClasses.input} />
          </div>

          <button className={useClasses.button}>Salvar</button>
        </div>
      </form>
    </Layout>
  );
}

export default EditAddress;
