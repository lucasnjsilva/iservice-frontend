"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";
import isAuthenticated from "@/services/isAuthenticated";

function Panel() {
  const navigate = useRouter();

  useEffect(() => {
    if (isAuthenticated() && !isAdmin()) {
      return navigate.push("/panel/dashboard");
    } else {
      return navigate.back();
    }
  }, [navigate]);

  return;
}

export default Panel;
