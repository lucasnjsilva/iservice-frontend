"use client";

import React, { useEffect, useState } from "react";
import ProviderHistory from "./provider";
import UserData from "@/fake/user.json";
import { UserRoles, UserType } from "@/interfaces/IUser";

function SchedulingHistory() {
  const [user, setUser] = useState<UserType>();
  useEffect(() => setUser(UserData), []);

  if (user) {
    if (user.role === UserRoles.provider) {
      return <ProviderHistory />;
    } else {
      console.log("Redirecionar");
    }
  }

  return null;
}

export default SchedulingHistory;
