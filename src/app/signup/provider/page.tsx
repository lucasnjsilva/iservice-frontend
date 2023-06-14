"use client";

import React, { useEffect, useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "../../layouts/unauthenticated/index";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";
import useSWR from "swr";
import InputMask from "react-input-mask";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const ufFetcher = (url: string) => fetch(url).then((res) => res.json());
const citiesFetcher = (url: string) => fetch(url).then((res) => res.json());

function ProviderSignUp() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [uf, setUf] = useState<string>();
  const [city, setCity] = useState<string>();
  const [error, setError] = useState<string>();

  const ufURL = "https://brasilapi.com.br/api/ibge/uf/v1";
  const useUFFetcher = useSWR(ufURL, ufFetcher);

  const citiesURL = `https://brasilapi.com.br/api/ibge/municipios/v1/${uf}`;
  const useCitiesFetcher = useSWR(citiesURL, uf ? citiesFetcher : null);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
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

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    const formElement = event.currentTarget;

    const formValues: Record<string, string> = {};

    const inputElements = formElement.querySelectorAll(
      'input[name]:not([type="file"])'
    );

    inputElements.forEach((input) => {
      if (input instanceof HTMLInputElement) {
        formValues[input.name] = input.value;
        formData.append(input.name, input.value);
      }
    });

    formValues["uf"] = uf || "";
    formData.append("uf", uf || "");

    const fileElement = formElement.querySelector('input[name="profileImage"]');
    if (fileElement instanceof HTMLInputElement && fileElement.files) {
      const file = fileElement.files[0];
      formData.append(fileElement.name, file);
    }

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const request = await fetch(`${API_HOST}/providers`, options);
      const { error: requestError, result } = await request.json();

      if (requestError) {
        setError(
          requestError.message ||
            "Ocorreu um erro ao tentar criar sua conta, por favor tente novamente."
        );
      } else {
        alert("Cadastrado com sucesso.");
        navigate.push("/signin/provider");
      }
    } catch (error) {
      setError(
        "Ocorreu um erro ao tentar criar sua conta, por favor tente novamente."
      );
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
                  Nome*
                </label>
                <input
                  name="name"
                  type="text"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={useClasses.label}>
                  E-mail*
                </label>
                <input
                  name="email"
                  type="text"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className={useClasses.label}>
                  Senha*
                </label>
                <input
                  name="password"
                  type="password"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className={useClasses.label}>
                  Telefone*
                </label>
                <InputMask
                  mask="(99) 99999-9999"
                  name="phone"
                  placeholder="Telefone"
                  className={useClasses.input}
                />
              </div>

              <div>
                <label htmlFor="cnpj" className={useClasses.label}>
                  CNPJ*
                </label>
                <InputMask
                  mask="99.999.999/9999-99"
                  name="cnpj"
                  placeholder="CNPJ"
                  className={useClasses.input}
                  required
                />
              </div>

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

              <div>
                <label htmlFor="address" className={useClasses.label}>
                  Endereço*
                </label>
                <input
                  name="address"
                  type="text"
                  className={useClasses.input}
                  required
                />
              </div>

              <div>
                <label htmlFor="number" className={useClasses.label}>
                  Número
                </label>
                <input name="number" type="text" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="neighborhood" className={useClasses.label}>
                  Bairro*
                </label>
                <input
                  name="neighborhood"
                  type="text"
                  className={useClasses.input}
                  required
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
                />
              </div>

              <div>
                <label htmlFor="cep" className={useClasses.label}>
                  CEP
                </label>
                <input name="cep" type="text" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="uf" className={useClasses.label}>
                  Estado*
                </label>
                <select
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
                <label htmlFor="aboutMe" className={useClasses.label}>
                  Sobre mim
                </label>
                <textarea name="aboutMe" className={useClasses.input} />
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

export default ProviderSignUp;
