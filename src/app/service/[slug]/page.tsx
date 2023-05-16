import React from "react";
import Layout from "@/app/layouts/unauthenticated";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import EvaluationCard from "@/components/EvaluationCard";
import Pagination from "@/components/Pagination";

function Service() {
  const useClasses = useStyle(classes);
  const professionalProfile =
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Quer procurar por algo mais?</h2>
          <SearchBar />
        </div>
      </div>

      <section className={useClasses.section}>
        <div className={useClasses.cardWrapper}>
          <div className={useClasses.body}>
            <div className={useClasses.cardContainer}>
              <div className={useClasses.imageContainer}>
                <Image
                  alt="..."
                  src={professionalProfile}
                  className={useClasses.image}
                  width={1000}
                  height={1000}
                />
              </div>

              <div className={useClasses.infoContainer}>
                <h3 className={useClasses.name}>
                  Felipe Serra
                  <span className={useClasses.service}>Mecânico</span>
                </h3>
                <p className={useClasses.description}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                  nisi, nulla sed doloremque necessitatibus optio aut ea, quod
                  praesentium debitis in, repudiandae ex ut culpa voluptate
                  commodi odit fugiat impedit.
                </p>

                <div>
                  <button className={useClasses.button}>Agendar serviço</button>
                </div>
              </div>
            </div>

            <hr className={useClasses.divisor} />
            <div className={useClasses.grid}>
              <EvaluationCard
                title="teste"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                star={3}
              />
              <EvaluationCard
                title="teste"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                star={2}
              />
              <EvaluationCard
                title="teste"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                star={4}
              />
              <EvaluationCard
                title="teste"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                star={1}
              />
              <EvaluationCard
                title="teste"
                comment="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                star={5}
              />
            </div>

            <Pagination page={1} total={84} />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Service;
