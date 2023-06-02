"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import isAuthenticated from "@/services/isAuthenticated";
import { isAdmin } from "@/services/checkRole";

function Admin() {
  const navigate = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      return navigate.push("/admin/signin");
    }

    if (isAuthenticated() && isAdmin()) {
      return navigate.push("/admin/dashboard");
    } else {
      return navigate.back();
    }
  }, [navigate]);

  return;
}

export default Admin;
