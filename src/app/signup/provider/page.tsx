"use client";

import React, { useEffect } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "../../layouts/unauthenticated/index";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";

function ProviderSignUp() {
  const useClasses = useStyle(classes);

  const navigate = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
  }, [navigate]);

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Criar conta</h2>

          <form className={useClasses.form}>
            <div className={useClasses.formGroup}>
              <div>
                <label htmlFor="name" className={useClasses.label}>
                  Nome
                </label>
                <input
                  name="name"
                  type="text"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={useClasses.label}>
                  E-mail
                </label>
                <input
                  name="email"
                  type="text"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className={useClasses.label}>
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className={useClasses.label}>
                  Telefone
                </label>
                <input name="phone" type="text" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="cnpj" className={useClasses.label}>
                  CNPJ
                </label>
                <input
                  name="cnpj"
                  type="text"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="profile" className={useClasses.label}>
                  Imagem de perfil
                </label>
                <input
                  name="profile"
                  type="file"
                  className={useClasses.input}
                />
              </div>

              <button className={useClasses.button}>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ProviderSignUp;
