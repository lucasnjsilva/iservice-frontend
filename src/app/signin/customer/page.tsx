"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/app/layouts/unauthenticated/index";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import useLocalStorage from "@/utils/useLocalStorage";
import isAuthenticated from "@/services/isAuthenticated";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function Login() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [data, setData] = useState<{ email?: string; password?: string }>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
  }, [navigate]);

  const handleSignIn = async (evt: any) => {
    evt.preventDefault();

    if (!data?.email || !data?.password) {
      setError("Você precisa preencher o e-mail e senha para fazer o login.");
      return;
    }

    const credentials = {
      email: data!.email,
      password: data!.password,
      type: "customer",
    };

    try {
      const loginRequest = await fetch(`${API_HOST}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const { error: loginError, result: loginResult } =
        await loginRequest.json();

      if (loginError) {
        setError("Verifique seu e-mail e senha e tente novamente.");
        return;
      }

      if (loginResult?.token) {
        const meRequest = await fetch(`${API_HOST}/me`, {
          headers: { Authorization: `Bearer ${loginResult.token}` },
        });

        const { result: meResult } = await meRequest.json();

        const user = {
          id: meResult.id,
          token: loginResult.token,
          role: meResult.role,
        };

        useLocalStorage.set("user", user);
        navigate.push("/panel/dashboard");
      }
    } catch (error) {
      setError(
        "Ocorreu um erro durante o login. Por favor, tente novamente mais tarde."
      );
    }
  };

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Login</h2>

          <form className={useClasses.form} onSubmit={handleSignIn}>
            <div className={useClasses.formGroup}>
              {error ? <p className="text-sm text-red-500">* {error}</p> : null}
              <div>
                <label htmlFor="email" className={useClasses.label}>
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  className={useClasses.input}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
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
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <button
                className={useClasses.button}
                onClick={(evt) => handleSignIn(evt)}
              >
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

            <div className={useClasses.haventAccountGroup}>
              <p className={useClasses.haventAccountText}>
                <a
                  href="/forgot_password/customer"
                  className={useClasses.signupButton}
                >
                  Esqueceu sua senha?
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
