"use client";

import React, { useEffect, useState } from "react";
import AccountProvider from "./provider";
import AccountCustomer from "./customer";
import { useRouter } from "next/navigation";
import { isAdmin, isCustomer, isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

function MyAccount() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isAdmin()) navigate.back();
  if (isProvider()) return <AccountProvider />;
  if (isCustomer()) return <AccountCustomer />;

  return null;
}

export default MyAccount;
