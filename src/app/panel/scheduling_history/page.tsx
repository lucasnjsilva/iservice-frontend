"use client";

import React, { useEffect, useState } from "react";
import ProviderHistory from "./provider";
import { useRouter } from "next/navigation";
import { isAdmin, isProvider, isCustomer } from "@/services/checkRole";

function SchedulingHistory() {
  const navigate = useRouter();

  if (isAdmin() || isCustomer()) navigate.back();

  if (isProvider()) return <ProviderHistory />;
}

export default SchedulingHistory;
