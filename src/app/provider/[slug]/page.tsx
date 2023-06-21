"use client";

import React, { useEffect, useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Layout from "../../layouts/unauthenticated/index";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import ScheduleModal from "@/components/ScheduleModal";
import UnauthenticatedModal from "@/components/UnauthenticatedModal";
import { useParams } from "next/navigation";
import { isCustomer } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";
import { requestHeader } from "@/services/api";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  const res = await fetch(`${API_HOST}/providers/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Provider() {
  const { slug } = useParams();
  const useClasses = useStyle(classes);
  const [data, setData] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    getData(slug).then(({ result }) => setData(result));

    if (isAuthenticated() && isCustomer()) {
      setDisabled(false);
    }

    if (isAuthenticated() && !isCustomer()) {
      setDisabled(true);
    }
  }, [slug]);

  const switchModal = () => {
    return disabled
      ? alert("Para fazer um agendamento, entre com o perfil de cliente.")
      : handleModal();
  };
  const handleModal = () => setIsOpen(!isOpen);

  const onConfirm = async (id: string, date: string) => {
    const payload = { serviceId: id, attendanceDate: date };
    const request = await fetch(`${API_HOST}/attendances`, {
      method: "POST",
      headers: requestHeader,
      body: JSON.stringify(payload),
    });

    const { error: requestError, result } = await request.json();

    if (requestError) {
      alert(
        "Ocorreu um erro ao tentar criar sua conta, por favor tente novamente."
      );
    }

    if (result) {
      alert("Cadastrado com sucesso.");
      window.location.reload();
    }
  };

  const renderModal = () => {
    if (isAuthenticated()) {
      return (
        <ScheduleModal
          isOpen={isOpen}
          onClose={handleModal}
          onConfirm={onConfirm}
          providerId={slug || undefined}
        />
      );
    } else {
      return <UnauthenticatedModal isOpen={isOpen} onClose={handleModal} />;
    }
  };

  return (
    <>
      {renderModal()}

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
                        src={
                          data && data.profile_image
                            ? `${process.env.NEXT_PUBLIC_S3_BUCKET_PATH}/${data.profile_image}`
                            : "/assets/blank_profile.png"
                        }
                        className={useClasses.image}
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </div>
                </div>

                <div className={useClasses.textContainer}>
                  <h3 className={useClasses.name}>{data?.name ?? ""}</h3>
                  <div className={useClasses.location}>
                    {data?.city ?? ""}, {data?.uf ?? ""}
                  </div>
                  <div className={useClasses.services}>
                    {data && data.services
                      ? data.services.map((item: any) => (
                          <a href="#" key={item.id}>
                            <span className={useClasses.service}>
                              {item.name}
                            </span>
                          </a>
                        ))
                      : null}
                  </div>
                </div>

                <div className={useClasses.descriptionArea}>
                  <div className={useClasses.descriptionWrapper}>
                    <div className={useClasses.descriptionContainer}>
                      <p className={useClasses.description}>
                        {data?.about_me ?? ""}
                      </p>
                      <button
                        className={useClasses.scheduleButton}
                        onClick={switchModal}
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
