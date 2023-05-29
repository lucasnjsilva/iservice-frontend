import React, { useState } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import { SearchTypes } from "@/interfaces/ISearch";
import { useRouter } from "next/navigation";
import useSWR from "swr";

type PropTypes = {
  service: string | null;
  category: string | null;
  uf: string | null;
  city: string | null;
};

const categoryFetcher = (url: string) => fetch(url).then((res) => res.json());
const ufFetcher = (url: string) => fetch(url).then((res) => res.json());
const citiesFetcher = (url: string) => fetch(url).then((res) => res.json());

function SearchBar(props: PropTypes) {
  const { service, category, uf, city } = props;
  const useClasses = useStyle(classes);
  const navigate = useRouter();
  const [search, setSearch] = useState<SearchTypes>({
    service: service || "",
    category: category || "",
    uf: uf || "",
    city: city || "",
  });

  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const categoryURL = `${API_HOST}/categories`;
  const useCategoryFetcher = useSWR(categoryURL, categoryFetcher);

  const ufURL = "https://brasilapi.com.br/api/ibge/uf/v1";
  const useUFFetcher = useSWR(ufURL, ufFetcher);

  const searchUf = search?.uf || "";
  const citiesURL = `https://brasilapi.com.br/api/ibge/municipios/v1/${searchUf}`;
  const useCitiesFetcher = useSWR(citiesURL, citiesFetcher);

  const renderCategoryComponent = () => {
    if (useCategoryFetcher.error) return null;
    if (useCategoryFetcher.isLoading) return null;
    if (!useCategoryFetcher.data) return null;

    return useCategoryFetcher.data.result.map((item: any) => (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    ));
  };

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
    if (search?.uf && search.uf !== "") {
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

  const handleSearch = () => {
    const { service = "", category = "", uf = "", city = "" } = search ?? {};
    const url = `/search?name=${service}&category=${category}&uf=${uf}&city=${city}`;

    navigate.push(url);
  };

  return (
    <main className={useClasses.area}>
      <div className={useClasses.inputGroup}>
        <div>
          <label htmlFor="service" className={useClasses.label}>
            Serviço
          </label>
          <input
            name="service"
            type="text"
            value={search?.service}
            className={useClasses.input}
            onChange={(e) => setSearch({ ...search, service: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="services" className={useClasses.label}>
            Categorias
          </label>

          <input
            list="categories"
            placeholder="Categorias"
            value={search?.category}
            className={useClasses.input}
            onChange={(e) => setSearch({ ...search, category: e.target.value })}
          />
          <datalist id="categories">{renderCategoryComponent()}</datalist>
        </div>

        <div>
          <label htmlFor="services" className={useClasses.label}>
            Estado
          </label>

          <select
            id="ufs"
            className={useClasses.input}
            value={search?.uf}
            onChange={(e) => setSearch({ ...search, uf: e.target.value })}
          >
            <option value="">Selecione um...</option>
            {renderUFComponent()}
          </select>
        </div>

        <div>
          <label htmlFor="services" className={useClasses.label}>
            Cidade
          </label>

          <input
            list="cities"
            placeholder="Cidades"
            className={useClasses.input}
            disabled={!search || !search.uf}
            value={search?.uf && search?.city ? search.city : ""}
            onChange={(e) => setSearch({ ...search, city: e.target.value })}
          />
          <datalist id="cities">{renderCityComponent()}</datalist>
        </div>

        <div>
          <button className={useClasses.button} onClick={handleSearch}>
            Pesquisar
          </button>
        </div>
      </div>
    </main>
  );
}

export default SearchBar;
