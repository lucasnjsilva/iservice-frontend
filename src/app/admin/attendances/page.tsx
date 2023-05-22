import React from "react";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";

function MyAccount() {
  return (
    <Layout title="Atendimentos" admin={true}>
      <section>
        <p>teste</p>
      </section>
    </Layout>
  );
}

export default MyAccount;
