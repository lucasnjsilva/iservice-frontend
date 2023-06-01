"use client";

import React, { useEffect, useState } from "react";
import ProviderHistory from "./provider";
import { useRouter } from "next/navigation";
import { isProvider } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

function SchedulingHistory() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !isProvider()) {
      navigate.back();
    } else {
      return setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return <ProviderHistory />;
}

export default SchedulingHistory;
