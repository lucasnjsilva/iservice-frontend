"use client";

import React, { useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "../../layouts/unauthenticated/index";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import ScheduleModal from "@/components/ScheduleModal";
import UnauthenticatedModal from "@/components/UnauthenticatedModal";

export default function Provider() {
  const useClasses = useStyle(classes);
  const [isOpen, setIsOpen] = useState(false);

  const professionalProfile =
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";

  const handleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <ScheduleModal isOpen={isOpen} onClose={handleModal} />

      <Layout>
        <div className={useClasses.container}>
          <div className={useClasses.wrapper}>
            <h2 className={useClasses.title}>Quer procurar por algo mais?</h2>
            <SearchBar />
          </div>
        </div>

        <section className={useClasses.section}>
          <div className={useClasses.cardWrapper}>
            <div className={useClasses.cardContainer}>
              <div className="px-6">
                <div className={useClasses.profileWrapper}>
                  <div className={useClasses.profileContainer}>
                    <div className="relative">
                      <Image
                        alt="..."
                        src={professionalProfile}
                        className={useClasses.image}
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </div>
                </div>

                <div className={useClasses.textContainer}>
                  <h3 className={useClasses.name}>Luiz Carlos</h3>
                  <div className={useClasses.location}>Caruaru, PE</div>
                  <div className={useClasses.job}>Técnico Eletricista</div>
                  <div className={useClasses.services}>
                    <a href="">
                      <span className={useClasses.service}>Mecânico</span>
                    </a>

                    <a href="">
                      <span className={useClasses.service}>Eletricista</span>
                    </a>
                  </div>
                </div>

                <div className={useClasses.descriptionArea}>
                  <div className={useClasses.descriptionWrapper}>
                    <div className={useClasses.descriptionContainer}>
                      <p className={useClasses.description}>
                        Sou um técnico eletricista com mais de 20 anos de
                        experiência na área. Tenho formação técnica em
                        eletricidade e sou especialista em instalações
                        elétricas, reparos e manutenções em sistemas elétricos
                        de baixa e média tensão.
                      </p>
                      <button
                        className={useClasses.scheduleButton}
                        onClick={handleModal}
                      >
                        Agendar serviço
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
