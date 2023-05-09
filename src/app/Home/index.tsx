"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ProfessionalCard from "@/components/ProfessionalCard";
import SearchHomePage from "@/components/SearchHomePage";
import useStyle from "@/utils/cssHandler";
import classes from "./style";

export default function Homepage() {
  const useClasses = useStyle(classes);
  const professionalProfile =
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";

  return (
    <main className={useClasses.main}>
      <Navbar />

      <section className={useClasses.section}>
        <div className={useClasses.wrapper}>
          <section className={useClasses.container}>
            <div className={useClasses.textContainer}>
              <p className={useClasses.subtitle}>
                Encontre agora dezenas de profissionais capazes de resolver seu
                problema!
              </p>

              <h1 className={useClasses.title}>
                Procurando por um serviço ou profissional?
              </h1>
            </div>

            <SearchHomePage />
          </section>

          <section className={useClasses.statsContainer}>
            <div className={useClasses.statsWrapper}>
              <div className={useClasses.stats}>
                <span className={useClasses.statsNumber}>200+</span>
                <span className={useClasses.statsLabel}>Profissionais</span>
              </div>

              <div className={useClasses.stats}>
                <span className={useClasses.statsNumber}>500+</span>
                <span className={useClasses.statsLabel}>Agendamentos</span>
              </div>

              <div className={useClasses.stats}>
                <span className={useClasses.statsNumber}>250+</span>
                <span className={useClasses.statsLabel}>Clientes</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="bg-white py-24">
        <h1 className={useClasses.title2}>Serviços mais Procurados</h1>

        <div className={useClasses.grid}>
          <ServiceCard title="Mecânico" />
          <ServiceCard title="Encanador" />
          <ServiceCard title="Eletricista" />
          <ServiceCard title="Pedreiro" />
        </div>
      </section>

      <section className="bg-white py-24">
        <h1 className={useClasses.title2}>Profissionais mais Contratados</h1>

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

      <Footer />
    </main>
  );
}
