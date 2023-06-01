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

              <div className={useClasses.loginSocialGroup}>
                <span className={useClasses.loginSocialLine}></span>
                <span className={useClasses.loginSocialText}>
                  Login with social
                </span>
              </div>

              <button className={useClasses.googleButton}>
                <svg
                  className="h-5 w-5 shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
                    fill="#EA4335"
                  />
                </svg>
                Continue com Google
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
