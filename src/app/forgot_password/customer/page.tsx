"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/app/layouts/unauthenticated/index";
import useStyle from "@/utils/cssHandler";
import classes from "../style";
import isAuthenticated from "@/services/isAuthenticated";
import useLocalStorage from "@/utils/useLocalStorage";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

function ForgotPasswordCustomer() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
  }, [navigate]);

  const handleRequest = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formValues.userType = "customer";
    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    await fetch(`${API_HOST}/forgot_password/send`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    useLocalStorage.set("forgotPassword::userType", "customer");

    return window.location.reload();
  };

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Esqueci minha senha</h2>

          <form className={useClasses.form} onSubmit={handleRequest}>
            <div className={useClasses.formGroup}>
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
              <p className="text-sm text-gay-300">
                Um e-mail vai ser enviado para o endereço que você digitar.
                Certifique-se de digitar um endereço válido.
              </p>

              <button type="submit" className={useClasses.button}>
                Verificar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ForgotPasswordCustomer;
