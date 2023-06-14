"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { requestHeader } from "@/services/api";
import useSWR from "swr";
import InputMask from "react-input-mask";
import { getToken } from "@/services/isAuthenticated";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData() {
  const res = await fetch(`${API_HOST}/me`, { headers: requestHeader });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const ufFetcher = (url: string) => fetch(url).then((res) => res.json());
const citiesFetcher = (url: string) => fetch(url).then((res) => res.json());

function AccountProvider() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  const [uf, setUf] = useState<string>();
  const [city, setCity] = useState<string>();

  const ufURL = "https://brasilapi.com.br/api/ibge/uf/v1";
  const useUFFetcher = useSWR(ufURL, ufFetcher);

  const citiesURL = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`;
  const useCitiesFetcher = useSWR(citiesURL, uf ? citiesFetcher : null);

  useEffect(() => {
    getData().then(({ result }) => {
      setData(result);
      setUf(result.uf);
      setCity(result.city);
    });
  }, [navigate]);

  const renderUFComponent = () => {
    if (useUFFetcher.error) return null;
    if (useUFFetcher.isLoading) return null;
    if (!useUFFetcher.data) return null;

    return useUFFetcher.data.map((item: any) => (
      <option key={item.id} value={item.sigla}>
        {item.nome}
      </option>
    ));
  };

  const renderCityComponent = () => {
    if (uf) {
      if (useCitiesFetcher.error) return null;
      if (useCitiesFetcher.isLoading) return null;
      if (!useCitiesFetcher.data) return null;

      return useCitiesFetcher.data.map((item: any) => (
        <option key={item.codigo_ibge} value={item.nome}>
          {item.nome}
        </option>
      ));
    }
  };

  const handleSave = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const request = await fetch(`${API_HOST}/me`, {
      method: "PUT",
      headers: requestHeader,
      body: JSON.stringify({ ...data, uf, city }),
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

  const handleProfile = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData();
    const formElement = evt.currentTarget;
    const fileElement = formElement.querySelector('input[name="profileImage"]');

    if (fileElement instanceof HTMLInputElement && fileElement.files) {
      const file = fileElement.files[0];
      formData.append("profileImage", file);
    }

    const request = await fetch(`${API_HOST}/me`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      setError(
        requestError.message ||
          "Ocorreu um erro ao tentar atualizar sua imagem de perfil, por favor, tente novamente."
      );
    } else {
      alert("Alterada com sucesso.");
      window.location.reload();
    }
  };

  const deleteProfileImage = async (evt: any) => {
    evt.preventDefault();

    const request = await fetch(`${API_HOST}/providers/profile_image/delete`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    const { error: requestError } = await request.json();

    if (requestError) {
      setError(
        requestError.message ||
          "Ocorreu um erro ao tentar deletar sua imagem de perfil, por favor, tente novamente."
      );
    } else {
      alert("Deletado com sucesso.");
      window.location.reload();
    }
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
              <InputMask
                mask="99.999.999/9999-99"
                name="cnpj"
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
              <InputMask
                mask="(99) 99999-9999"
                name="phone"
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
                value={data?.reference || ""}
                onChange={(e) =>
                  setData((prev: any) => ({
                    ...prev,
                    reference: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label htmlFor="uf" className={useClasses.label}>
                Estado*
              </label>
              <select
                required
                name="uf"
                value={uf}
                className={useClasses.inputSelect}
                onChange={(e) => setUf(e.target.value)}
              >
                <option value="">Selecione um...</option>
                {renderUFComponent()}
              </select>
            </div>

            <div>
              <label htmlFor="city" className={useClasses.label}>
                Cidade*
              </label>
              <input
                required
                name="city"
                list="cities"
                placeholder="Cidades"
                className={useClasses.input}
                disabled={!uf}
                value={uf && city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              />
              <datalist id="cities">{renderCityComponent()}</datalist>
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

        <form className={useClasses.form2} onSubmit={handleProfile}>
          <div className={useClasses.formGroup}>
            <div>
              <label htmlFor="profileImage" className={useClasses.label}>
                Imagem de perfil
              </label>
              <input
                name="profileImage"
                type="file"
                className={useClasses.input}
              />
            </div>

            <button type="submit" className={useClasses.button}>
              Salvar
            </button>

            <hr className="mt-2 -mb-2" />

            <button
              type="button"
              className={useClasses.button}
              onClick={(e) => deleteProfileImage(e)}
              disabled={data && data.profile_image === "" ? true : false}
            >
              Deletar imagem de perfil
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AccountProvider;
