"use client";

import React from "react";
import ProviderHistory from "./provider";
import { useRouter } from "next/navigation";
import { isProvider } from "@/services/checkRole";

function SchedulingHistory() {
  const navigate = useRouter();

  if (isProvider()) {
    return <ProviderHistory />;
  } else navigate.back();
}

export default SchedulingHistory;
