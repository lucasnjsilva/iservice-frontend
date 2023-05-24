import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";

function MyAccount() {
  const useClasses = useStyle(classes);
  const navigate = useRouter();

  if (isAdmin()) {
    return (
      <Layout title="Minha Conta" admin={true}>
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
  } else {
    navigate.back();
  }
}

export default MyAccount;
