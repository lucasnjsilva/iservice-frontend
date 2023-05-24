"use client";

import React from "react";
import AccountProvider from "./provider";
import AccountCustomer from "./customer";
import { useRouter } from "next/navigation";
import { isAdmin, isCustomer, isProvider } from "@/services/checkRole";

function MyAccount() {
  const navigate = useRouter();

  if (isAdmin()) navigate.back();
  if (isProvider()) return <AccountProvider />;
  if (isCustomer()) return <AccountCustomer />;

  return null;
}

export default MyAccount;
