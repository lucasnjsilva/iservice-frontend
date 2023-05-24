import React from "react";
import useStyle from "@/utils/cssHandler";
import Layout from "@/app/layouts/authenticated";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";

function Attendances() {
  const navigate = useRouter();

  if (isAdmin()) {
    return (
      <Layout title="Atendimentos" admin={true}>
        <section>
          <p>teste</p>
        </section>
      </Layout>
    );
  } else {
    navigate.back();
  }
}

export default Attendances;
