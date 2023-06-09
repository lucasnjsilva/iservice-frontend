"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { requestHeader } from "@/services/api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData() {
  const res = await fetch(`${API_HOST}/me`, { headers: requestHeader });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function AccountProvider() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    getData()
      .then(({ result }) => setData(result))
      .catch(() => navigate.back());
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
              <label htmlFor="cnpj" className={useClasses.label}>
                CNPJ
              </label>
              <input
                name="cnpj"
                type="text"
                className={useClasses.input}
                value={data?.cnpj || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, cnpj: e.target.value }))
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
                value={data?.email || ""}
                disabled
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

            <div>
              <label htmlFor="address" className={useClasses.label}>
                Endereço
              </label>
              <input
                name="address"
                type="text"
                className={useClasses.input}
                value={data?.address || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="number" className={useClasses.label}>
                Número
              </label>
              <input
                name="number"
                type="text"
                className={useClasses.input}
                value={data?.number || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, number: e.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="neighborhood" className={useClasses.label}>
                Bairro
              </label>
              <input
                name="neighborhood"
                type="text"
                className={useClasses.input}
                value={data?.neighborhood || ""}
                onChange={(e) =>
                  setData((prev: any) => ({
                    ...prev,
                    neighborhood: e.target.value,
                  }))
                }
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
                value={data?.complement || ""}
                onChange={(e) =>
                  setData((prev: any) => ({
                    ...prev,
                    complement: e.target.value,
                  }))
                }
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
                value={data?.complement || ""}
                onChange={(e) =>
                  setData((prev: any) => ({
                    ...prev,
                    complement: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label htmlFor="city" className={useClasses.label}>
                Cidade
              </label>
              <input
                name="city"
                type="text"
                className={useClasses.input}
                value={data?.city || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, city: e.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="uf" className={useClasses.label}>
                Estado
              </label>
              <input
                name="uf"
                type="text"
                className={useClasses.input}
                value={data?.uf || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, uf: e.target.value }))
                }
              />
            </div>

            <div>
              <label htmlFor="cep" className={useClasses.label}>
                CEP
              </label>
              <input
                name="cep"
                type="text"
                className={useClasses.input}
                value={data?.cep || ""}
                onChange={(e) =>
                  setData((prev: any) => ({ ...prev, cep: e.target.value }))
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

export default AccountProvider;
