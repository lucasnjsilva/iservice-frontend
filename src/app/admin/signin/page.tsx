import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "../../layout/index";

function Login() {
  const useClasses = useStyle(classes);

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Login</h2>

          <form className={useClasses.form}>
            <div className={useClasses.formGroup}>
              <div>
                <label htmlFor="email" className={useClasses.label}>
                  E-mail
                </label>
                <input name="email" className={useClasses.input} />
              </div>

              <div>
                <label htmlFor="password" className={useClasses.label}>
                  Senha
                </label>
                <input name="password" className={useClasses.input} />
              </div>

              <button className={useClasses.button}>Entrar</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
