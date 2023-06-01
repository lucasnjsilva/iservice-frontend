"use client";

import React, { useEffect } from "react";
import Layout from "../layouts/unauthenticated/index";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import Link from "next/link";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";

function Register() {
  const useClasses = useStyle(classes);

  const navigate = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate.back();
    }
  }, [navigate]);

  return (
    <Layout>
      <div className={useClasses.container}>
        <div className={useClasses.wrapper}>
          <h2 className={useClasses.title}>O que quer fazer?</h2>

          <div className={useClasses.buttonArea}>
            <div className={useClasses.buttonGroup}>
              <Link href="/signup/customer" className={useClasses.button}>
                <button>Quero contratar profissionais</button>
              </Link>

              <Link href="/signup/provider" className={useClasses.button}>
                <button>Quero ser contratado</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
