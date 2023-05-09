"use client";

import { useEffect } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";

function SearchHomePage() {
  const useClasses = useStyle(classes);

  useEffect(() => {});

  return (
    <>
      <div className={useClasses.container}>
        <div className={useClasses.inputGroup}>
          <label htmlFor="services" className={useClasses.label}>
            Serviços
          </label>

          <input
            type="text"
            id="services"
            className={useClasses.input}
            placeholder="Serviços"
          ></input>
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="services" className={useClasses.label}>
            Categorias
          </label>

          <input
            list="categories"
            placeholder="Categorias"
            className={useClasses.input}
          />
          <datalist id="categories">
            <option value="encanador">Encanador</option>
            <option value="mecanico">Mecânico</option>
            <option value="eletricista">Eletricista</option>
          </datalist>
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="services" className={useClasses.label}>
            Estado
          </label>

          <input
            list="ufs"
            placeholder="Estados"
            className={useClasses.input}
          />
          <datalist id="ufs">
            <option value="PE">Pernambuco</option>
            <option value="SP">São Paulo</option>
            <option value="PB">Paraíba</option>
          </datalist>
        </div>

        <div className={useClasses.inputGroup}>
          <label htmlFor="services" className={useClasses.label}>
            Cidade
          </label>

          <input
            list="cities"
            placeholder="Cidades"
            className={useClasses.input}
            disabled
          />
          <datalist id="cities">
            <option value="Pesqueira">Pesqueira</option>
            <option value="Caruaru">Caruaru</option>
            <option value="Recife">Recife</option>
          </datalist>
        </div>

        <button className={useClasses.button}>Pesquisar</button>
      </div>
    </>
  );
}

export default SearchHomePage;
