"use client";
import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter, useParams } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";
import InputMask from "react-input-mask";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  const res = await fetch(`${API_HOST}/providers/${id}`, {
    headers: requestHeader,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function Edit() {
  const { id } = useParams();
  const navigate = useRouter();
  const useClasses = useStyle(classes);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
  });

  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const request = await fetch(`${API_HOST}/providers/${id}`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify(formValues),
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      window.location.reload();

      return alert(
        "Ocorreu um erro ao tentar atualizar o nome da categoria, por favor, tente novamente."
      );
    }

    navigate.back();
  };

  const handlePassword = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const formValues: Record<string, string> = {};

    formData.forEach((value, key) => {
      formValues[key] = value as string;
    });

    const request = await fetch(`${API_HOST}/providers/password/${id}`, {
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

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    getData(id).then(({ result }) => {
      setData(result);
    });
  }, [navigate, id]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout title="Editar prestador" admin={true}>
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
                value={data.name}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, name: e.target.value }))
                }
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
                value={data.email}
                disabled
              />
            </div>

            <div>
              <label htmlFor="cnpj" className={useClasses.label}>
                CNPJ
              </label>
              <InputMask
                mask="99.999.999/9999-99"
                name="cnpj"
                className={useClasses.input}
                value={data.cnpj}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, cnpj: e.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="phone" className={useClasses.label}>
                Telefone
              </label>
              <InputMask
                mask="(99) 99999-9999"
                name="phone"
                className={useClasses.input}
                value={data.phone}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, phone: e.target.value }))
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
                required
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
                required
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

export default Edit;
