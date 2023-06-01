"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "../../layouts/unauthenticated/index";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";
import useLocalStorage from "@/utils/useLocalStorage";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function Login() {
  const useClasses = useStyle(classes);
  const [error, setError] = useState<string>();

  const navigate = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
  }, [navigate]);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const body = JSON.stringify({ ...formValues, type: "provider" });
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    };

    if (!formValues.email || !formValues.password) {
      setError("Você precisa preencher o e-mail e senha para fazer o login.");
    }

    const request = await fetch(`${API_HOST}/login`, options);

    const { error: requestError, result } = await request.json();

    if (requestError) {
      if (requestError.message) {
        setError(requestError.message);
      } else {
        const errorPassword = "E_INVALID_AUTH_PASSWORD: Password mis-match";
        const errorNotFound = "NOT_FOUND";

        if (
          requestError.message === errorPassword ||
          requestError.message === errorNotFound
        ) {
          setError("E-mail ou senha incorretos.");
        }

        setError("Verifique seu e-mail e senha e tente novamente.");
      }
    }

    if (result && result.token) {
      const meRequest = await fetch(`${API_HOST}/me`, {
        headers: { Authorization: `Bearer ${result.token}` },
      });

      const { result: meResult } = await meRequest.json();

      const user = {
        id: meResult.id,
        token: result.token,
        role: meResult.role,
      };

      useLocalStorage.set("user", user);
      navigate.push("/panel/dashboard");
    }
  };

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Login</h2>

          <form className={useClasses.form} onSubmit={handleSignIn}>
            <div className={useClasses.formGroup}>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <div>
                <label htmlFor="email" className={useClasses.label}>
                  E-mail
                </label>
                <input name="email" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="password" className={useClasses.label}>
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  className={useClasses.input}
                />
              </div>

              <button className={useClasses.button} type="submit">
                Entrar
              </button>
            </div>

            <div className={useClasses.haventAccountGroup}>
              <p className={useClasses.haventAccountText}>
                Não possui uma conta?{" "}
                <a href="/signup" className={useClasses.signupButton}>
                  Cadastre-se agora!
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
