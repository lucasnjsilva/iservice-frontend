"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/app/layouts/unauthenticated";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import EvaluationCard from "@/components/EvaluationCard";
import { useParams } from "next/navigation";
import UnauthenticatedModal from "@/components/UnauthenticatedModal";
import Link from "next/link";
import isAuthenticated from "@/services/isAuthenticated";
import ScheduleModal from "@/components/ScheduleModal";
import { requestHeader } from "@/services/api";
import { isCustomer } from "@/services/checkRole";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

async function getData(id: string) {
  const res = await fetch(`${API_HOST}/services/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getAttendances(id: string) {
  const res = await fetch(`${API_HOST}/attendances/evaluations/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function Service() {
  const { slug } = useParams();
  const useClasses = useStyle(classes);
  const [data, setData] = useState<any>();
  const [attendances, setAttendances] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    getData(slug).then(({ result }) => setData(result));
    getAttendances(slug).then(({ result }) => setAttendances(result));

    if (isCustomer()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [slug]);

  const switchModal = () => {
    return disabled
      ? alert("Para fazer um agendamento, entre com o perfil de cliente.")
      : handleCloseModal();
  };

  const handleCloseModal = () => setIsOpen(!isOpen);

  const onConfirm = async (
    selectedService: string,
    selectedAddress: string,
    date: string
  ) => {
    const payload = {
      serviceId: selectedService,
      addressId: selectedAddress,
      attendanceDate: date,
    };

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

  const renderEvaluations = () => {
    if (attendances) {
      return attendances.map((attendance: any) =>
        attendance.evaluations.map((item: any) => (
          <EvaluationCard
            key={item.id}
            title={attendance.customer.name}
            comment={item.comment}
            star={item.vote}
          />
        ))
      );
    }
  };

  const renderModal = () => {
    if (isAuthenticated()) {
      return (
        <ScheduleModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          onConfirm={onConfirm}
          providerId={data?.provider_id || undefined}
          serviceId={slug}
        />
      );
    } else {
      return (
        <UnauthenticatedModal isOpen={isOpen} onClose={handleCloseModal} />
      );
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
            <div className={useClasses.body}>
              <div className={useClasses.cardContainer}>
                <div className={useClasses.imageContainer}>
                  <Link
                    href={
                      data && data.provider
                        ? `/provider/${data.provider.id}`
                        : "#"
                    }
                  >
                    <Image
                      alt="..."
                      src={
                        data && data.provider.profile_image
                          ? `${process.env.NEXT_PUBLIC_S3_BUCKET_PATH}/${data.provider.profile_image}`
                          : "/assets/blank_profile.png"
                      }
                      className={useClasses.image}
                      width={1000}
                      height={1000}
                    />
                  </Link>
                </div>

                <div className={useClasses.infoContainer}>
                  <h3 className={useClasses.name}>
                    {(data && data.name) ?? ""}
                  </h3>
                  <h3 className={useClasses.providerName}>
                    <a
                      href={
                        data && data.provider
                          ? `/provider/${data.provider.id}`
                          : "#"
                      }
                    >
                      {(data && data.provider.name) ?? ""}
                    </a>
                    <span className={useClasses.service}>
                      {(data && data.category.name) ?? ""}
                    </span>
                  </h3>
                  <p className={useClasses.location}>
                    {(data && data.provider.city) ?? ""} -{" "}
                    {(data && data.provider.uf) ?? ""}
                  </p>
                  <p className={useClasses.description}>
                    {(data && data.description) ?? ""}
                  </p>

                  <div>
                    <button className={useClasses.button} onClick={switchModal}>
                      Agendar serviço
                    </button>
                  </div>
                </div>
              </div>

              <hr className={useClasses.divisor} />
              <div className={useClasses.grid}>{renderEvaluations()}</div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Service;
