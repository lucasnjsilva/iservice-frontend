"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/app/layouts/unauthenticated/index";
import useStyle from "@/utils/cssHandler";
import classes from "../style";
import isAuthenticated from "@/services/isAuthenticated";
import useLocalStorage from "@/utils/useLocalStorage";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function verify(token: string, userType: string) {
  const request = await fetch(`${API_HOST}/forgot_password/verify`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, userType }),
  });

  if (!request.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await request.json();

  if (result.result.isValid === false) {
    window.location.href = "/";
  }

  return result;
}

function ForgotPasswordReset() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const queryParams = useSearchParams();
  const token = queryParams.get("token") || "";

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }

    const userType: string | null = useLocalStorage.get(
      "forgotPassword::userType"
    );

    if (userType === null || token === "") {
      navigate.push("/");
    }

    if (typeof userType === "string") {
      verify(token, userType);
    }
  }, [navigate]);

  const handleRequest = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    const userType: string | null = useLocalStorage.get(
      "forgotPassword::userType"
    );

    if (userType !== null && token !== "") {
      formValues.userType = userType;
      formValues.token = token;
      formData.forEach((value, key) => {
        formValues[key] = value as string;
      });

      await fetch(`${API_HOST}/forgot_password/reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      useLocalStorage.remove("forgotPassword::userType");

      return navigate.push(`/signin/${userType}`);
    }
  };

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Esqueci minha senha</h2>

          <form className={useClasses.form} onSubmit={handleRequest}>
            <div className={useClasses.formGroup}>
              <div>
                <label htmlFor="password" className={useClasses.label}>
                  Nova senha
                </label>
                <input
                  name="password"
                  type="password"
                  className={useClasses.input}
                  required
                />
              </div>

              <button type="submit" className={useClasses.button}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPasswordReset;
