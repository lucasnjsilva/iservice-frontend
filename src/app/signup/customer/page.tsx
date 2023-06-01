"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "../../layouts/unauthenticated/index";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function CustomerSignUp() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
  }, [navigate]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    };

    const request = await fetch(`${API_HOST}/customers`, options);

    const { error: requestError, result } = await request.json();

    if (requestError) {
      if (requestError.message) {
        setError(requestError.message);
      } else {
        setError(
          "Ocorreu um erro ao tentar criar sua conta, por favor tente novamente."
        );
      }
    }

    if (result) {
      alert("Cadastrado com sucesso.");
      navigate.push("/signin/customer");
    }
  };

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Criar conta</h2>

          <form className={useClasses.form} onSubmit={handleFormSubmit}>
            <div className={useClasses.formGroup}>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <div>
                <label htmlFor="name" className={useClasses.label}>
                  Nome
                </label>
                <input name="name" type="text" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="cpf" className={useClasses.label}>
                  CPF
                </label>
                <input name="cpf" type="text" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="email" className={useClasses.label}>
                  E-mail
                </label>
                <input name="email" type="text" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="password" className={useClasses.label}>
                  Senha
                </label>
                <input
                  name="password"
                  type="password"
                  className={useClasses.input}
                />
              </div>

              <div>
                <label htmlFor="phone" className={useClasses.label}>
                  Telefone
                </label>
                <input name="phone" type="text" className={useClasses.input} />
              </div>

              <button type="submit" className={useClasses.button}>
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default CustomerSignUp;
