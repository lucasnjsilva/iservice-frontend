"use client";
import ServiceCard from "@/components/ServiceCard";
import ProfessionalCard from "@/components/ProfessionalCard";
import SearchHomePage from "@/components/SearchHomePage";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "../layouts/unauthenticated/index";
import SearchBar from "@/components/SearchBar";

export default function Homepage() {
  const useClasses = useStyle(classes);
  const professionalProfile =
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Pelo que está procurando?</h2>
          <SearchBar />
        </div>
      </div>

      <section className="bg-white py-24">
        <div className={useClasses.grid}>
          <ProfessionalCard
            name="João Carlos"
            profission="Eletricista"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="Luiz José"
            profission="Pedreiro"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="Luis Felipe"
            profission="Eletricista"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="Lucas Pedro"
            profission="Mecânico"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="João Carlos"
            profission="Eletricista"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="Luiz José"
            profission="Pedreiro"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="João Carlos"
            profission="Eletricista"
            profile={professionalProfile}
          />
          <ProfessionalCard
            name="Luiz José"
            profission="Pedreiro"
            profile={professionalProfile}
          />
        </div>
      </section>
    </Layout>
  );
}
