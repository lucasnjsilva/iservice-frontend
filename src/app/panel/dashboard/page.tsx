"use client";

import React, { useEffect, useState } from "react";
import ProviderDashboard from "./provider";
import CustomerDashboard from "./customer";
import { isAdmin, isProvider, isCustomer } from "@/services/checkRole";
import { useRouter } from "next/navigation";

function Dashboard() {
  const navigate = useRouter();

  if (isAdmin()) navigate.back();

  if (isProvider()) return <ProviderDashboard />;

  if (isCustomer()) return <CustomerDashboard />;
}

export default Dashboard;
