"use client";

import React, { useState, useEffect } from "react";
import classes from "./style";
import useStyle from "@/utils/cssHandler";
import Layout from "../layouts/unauthenticated/index";
import SearchBar from "@/components/SearchBar";
import ProfessionalCard from "@/components/ProfessionalCard";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Homepage() {
  const queryParams = useSearchParams();
  const service = queryParams.get("name") || "";
  const category = queryParams.get("category") || "";
  const uf = queryParams.get("uf") || "";
  const city = queryParams.get("city") || "";

  const useClasses = useStyle(classes);
  const [page, setPage] = useState<number>(1);

  const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
  const url = `${API_HOST}/services?service=${service}&category=${category}&uf=${uf}&city=${city}&page=${page}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  const renderComponent = () => {
    if (error) return null;
    if (isLoading) return null;
    if (!data || !data.result) return null;

    return data.result.map((item: any) => (
      <Link key={item.id} href={`/service/${item.id}`}>
        <ProfessionalCard
          name={item.name}
          profission={item.provider.name}
          profile={
            item.provider.profile_image
              ? `${process.env.NEXT_PUBLIC_S3_BUCKET_PATH}/${item.provider.profile_image}`
              : "/assets/blank_profile.png"
          }
        />
      </Link>
    ));
  };

  useEffect(() => {
    if (data && data.pagination && data.pagination.page) {
      setPage(data.pagination.page);
    }
  }, [data]);

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>Pelo que está procurando?</h2>
          <SearchBar
            service={service}
            category={category}
            uf={uf}
            city={city}
          />
        </div>
      </div>

      <section className="bg-white py-24">
        <div className={useClasses.grid}>{renderComponent()}</div>
        {data && data.pagination && (
          <Pagination
            page={page || 1}
            setPage={setPage}
            perPage={data.pagination.perPage}
            totalItems={data.pagination.total}
          />
        )}
      </section>
    </Layout>
  );
}
