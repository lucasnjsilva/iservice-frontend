"use client";

import React, { useEffect, useState } from "react";
import AccountProvider from "./provider";
import UserData from "@/fake/user.json";
import { UserRoles, UserType } from "@/interfaces/IUser";
import AccountCustomer from "./customer";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/services/checkRole";

function MyAccount() {
  const navigate = useRouter();
  const [user, setUser] = useState<UserType>();
  useEffect(() => setUser(UserData), []);

  if (isAdmin()) {
    navigate.back();
  } else {
    if (user && user.role === UserRoles.provider) {
      return <AccountProvider />;
    }

    if (user && user.role === UserRoles.customer) {
      return <AccountCustomer />;
    }

    return null;
  }
}

export default MyAccount;
