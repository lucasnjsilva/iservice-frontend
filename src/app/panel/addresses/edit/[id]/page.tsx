"use client";

import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { isCustomer } from "@/services/checkRole";
import { useRouter } from "next/navigation";

function EditAddress() {
  const navigate = useRouter();
  const useClasses = useStyle(classes);

  if (isCustomer()) {
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
              <input
                name="complement"
                type="text"
                className={useClasses.input}
              />
            </div>

            <div>
              <label htmlFor="reference" className={useClasses.label}>
                Referência
              </label>
              <input
                name="reference"
                type="text"
                className={useClasses.input}
              />
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
  } else navigate.back();
}

export default EditAddress;
