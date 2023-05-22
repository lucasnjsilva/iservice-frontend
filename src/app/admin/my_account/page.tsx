import React from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";

function MyAccount() {
  const useClasses = useStyle(classes);

  return (
    <Layout title="Minha Conta" admin={true}>
      <section>
        <p>teste</p>
      </section>
    </Layout>
  );
}

export default MyAccount;
