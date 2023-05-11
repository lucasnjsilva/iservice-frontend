import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";
import Link from "next/link";

function SearchBar() {
  const useClasses = useStyle(classes);

  return (
    <main className={useClasses.area}>
      <div className={useClasses.inputGroup}>
        <div>
          <label htmlFor="name" className={useClasses.label}>
            Serviço
          </label>
          <input name="name" type="text" className={useClasses.input} />
        </div>

        <div>
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

        <div>
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

        <div>
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

        <div>
          <Link href="#" className={useClasses.button}>
            <button>Pesquisar</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SearchBar;
