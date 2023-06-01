"use client";

import React, { useEffect, useState } from "react";
import ProviderDashboard from "./provider";
import CustomerDashboard from "./customer";
import { isAdmin, isProvider, isCustomer } from "@/services/checkRole";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";

function Dashboard() {
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
  if (isProvider()) return <ProviderDashboard />;
  if (isCustomer()) return <CustomerDashboard />;
}

export default Dashboard;
