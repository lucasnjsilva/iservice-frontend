import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";

function AccountCustomer() {
  const useClasses = useStyle(classes);

  return (
    <Layout title="Minha Conta" admin={false}>
      <div className={useClasses.wrapper}>
        <form className={useClasses.form}>
          <div className={useClasses.formGroup}>
            <div>
              <label htmlFor="name" className={useClasses.label}>
                Nome
              </label>
              <input name="name" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="cpf" className={useClasses.label}>
                CPF
              </label>
              <input name="cpf" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="email" className={useClasses.label}>
                E-mail
              </label>
              <input name="email" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="phone" className={useClasses.label}>
                Telefone
              </label>
              <input name="phone" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="address" className={useClasses.label}>
                Endereço
              </label>
              <input name="address" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="number" className={useClasses.label}>
                Número
              </label>
              <input name="number" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="neighborhood" className={useClasses.label}>
                Bairro
              </label>
              <input
                name="neighborhood"
                type="text"
                className={useClasses.input}
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
              <label htmlFor="city" className={useClasses.label}>
                Cidade
              </label>
              <input name="city" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="uf" className={useClasses.label}>
                Estado
              </label>
              <input name="uf" type="text" className={useClasses.input} />
            </div>

            <div>
              <label htmlFor="cep" className={useClasses.label}>
                CEP
              </label>
              <input name="cep" type="text" className={useClasses.input} />
            </div>

            <button className={useClasses.button}>Salvar</button>
          </div>
        </form>

        <form className={useClasses.form2}>
          <div className={useClasses.formGroup}>
            <div>
              <label htmlFor="currentPassword" className={useClasses.label}>
                Senha atual
              </label>
              <input
                name="currentPassword"
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

            <button className={useClasses.button}>Salvar</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AccountCustomer;
