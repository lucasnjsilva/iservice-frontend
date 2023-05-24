"use client";

import React, { useEffect, useState } from "react";
import ProviderHistory from "./provider";

type UserType = {
  name: string;
  role: string;
};

function SchedulingHistory() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setUser({ name: "Lucas", role: "provider" });
  }, []);

  if (user) {
    if (user.role === "provider") {
      return <ProviderHistory />;
    }
  }

  return null;
}

export default SchedulingHistory;
