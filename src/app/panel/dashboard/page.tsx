"use client";

import React, { useEffect, useState } from "react";
import ProviderDashboard from "./provider";
import CustomerDashboard from "./customer";
import UserData from "@/fake/user.json";
import { UserRoles, UserType } from "@/interfaces/IUser";

function Dashboard() {
  const [user, setUser] = useState<UserType>();
  useEffect(() => setUser(UserData), []);

  if (user) {
    if (user.role === UserRoles.provider) {
      return <ProviderDashboard />;
    }

    if (user.role === UserRoles.customer) {
      return <CustomerDashboard />;
    }
  }

  return null;
}

export default Dashboard;
