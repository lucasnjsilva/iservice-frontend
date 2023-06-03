"use client";

import React from "react";
import Layout from "../layouts/unauthenticated/index";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import ServiceCard from "@/components/ServiceCard";
import ProfessionalCard from "@/components/ProfessionalCard";
import SearchHomePage from "@/components/SearchHomePage";
import useSWR from "swr";
import Link from "next/link";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const serviceFetcher = (url: string) => fetch(url).then((res) => res.json());
const professionalFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export default function Homepage() {
  const useClasses = useStyle(classes);

  const serviceUrl = `${API_HOST}/attendances/services/top-contracted`;
  const useServiceFetcher = useSWR(serviceUrl, serviceFetcher);

  const professionalUrl = `${API_HOST}/attendances/professionals/top-contracted`;
  const useProfessionalFetcher = useSWR(professionalUrl, professionalFetcher);

  const renderServiceCard = () => {
    if (useServiceFetcher.error) return null;
    if (useServiceFetcher.isLoading) return null;
    if (!useServiceFetcher.data || !useServiceFetcher.data.result) return null;

    return useServiceFetcher.data.result.map(({ service }: any) => (
      <Link href={`/service/${service.id}`} key={service.id}>
        <ServiceCard title={service.name} description={service.description} />
      </Link>
    ));
  };

  const renderProfessionalCard = () => {
    if (useProfessionalFetcher.error) return null;
    if (useProfessionalFetcher.isLoading) return null;
    if (!useProfessionalFetcher.data || !useProfessionalFetcher.data.result)
      return null;

    return useProfessionalFetcher.data.result.map(({ service }: any) => (
      <Link href={`/provider/${service.provider_id}`} key={service.provider_id}>
        <ProfessionalCard
          name={service.provider.name}
          profission={service.name}
          profile={
            service.provider.profile_image ?? "/assets/blank_profile.png"
          }
        />
      </Link>
    ));
  };

  return (
    <Layout>
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
                <span className={useClasses.statsLabel}>
                  Clientes satisfeitos
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="bg-white py-24">
        <h1 className={useClasses.title2}>Serviços mais Procurados</h1>

        <div className={useClasses.grid}>{renderServiceCard()}</div>
      </section>

      <section className="bg-white py-24">
        <h1 className={useClasses.title2}>Profissionais mais Contratados</h1>

        <div className={useClasses.grid}>{renderProfessionalCard()}</div>
      </section>
    </Layout>
  );
}
