"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { requestHeader } from "@/services/api";
import { useRouter } from "next/navigation";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData() {
  const res = await fetch(`${API_HOST}/me`, { headers: requestHeader });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function AccountCustomer() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    getData().then(({ result }) => setData(result));
  }, [navigate]);

  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const request = await fetch(`${API_HOST}/me`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(data),
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      window.location.reload();

      return alert(
        "Ocorreu um erro ao tentar atualizar seus dados, por favor, tente novamente."
      );
    }

    window.location.reload();
  };

  const handlePassword = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const request = await fetch(`${API_HOST}/me/password`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(formValues),
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      if ((requestError.message = "Invalid old password")) {
        return setError("Senha atual inválida.");
      }

      window.location.reload();

      return alert(
        "Ocorreu um erro ao tentar atualizar seus dados, por favor, tente novamente."
      );
    }

    window.location.reload();
  };

  return (
    <Layout title="Minha Conta" admin={false}>
      <div className={useClasses.wrapper}>
        <form className={useClasses.form} onSubmit={handleSave}>
          <div className={useClasses.formGroup}>
            <div>
              <label htmlFor="name" className={useClasses.label}>
                Nome
              </label>
              <input
                name="name"
                type="text"
                className={useClasses.input}
                value={data?.name || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="cpf" className={useClasses.label}>
                CPF
              </label>
              <input
                name="cpf"
                type="text"
                className={useClasses.input}
                value={data?.cpf || ""}
                disabled
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
                disabled
                value={data?.email || ""}
              />
            </div>

            <div>
              <label htmlFor="phone" className={useClasses.label}>
                Telefone
              </label>
              <input
                name="phone"
                type="text"
                className={useClasses.input}
                value={data?.phone || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <button type="submit" className={useClasses.button}>
              Salvar
            </button>
          </div>
        </form>

        <form className={useClasses.form2} onSubmit={handlePassword}>
          <div className={useClasses.formGroup}>
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
            <div>
              <label htmlFor="oldPassword" className={useClasses.label}>
                Senha atual
              </label>
              <input
                name="oldPassword"
                type="password"
                className={useClasses.input}
              />
            </div>

            <div>
              <label htmlFor="newPassword" className={useClasses.label}>
                Nova senha
              </label>
              <input
                name="newPassword"
                type="password"
                className={useClasses.input}
              />
            </div>

            <button type="submit" className={useClasses.button}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AccountCustomer;
