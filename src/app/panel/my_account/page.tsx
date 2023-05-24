"use client";

import React, { useEffect, useState } from "react";
import AccountProvider from "./provider";
import UserData from "@/fake/user.json";
import { UserRoles, UserType } from "@/interfaces/IUser";
import AccountCustomer from "./customer";

function MyAccount() {
  const [user, setUser] = useState<UserType>();
  useEffect(() => setUser(UserData), []);

  if (user) {
    if (user.role === UserRoles.provider) {
      return <AccountProvider />;
    }

    if (user.role === UserRoles.customer) {
      return <AccountCustomer />;
    }
  }

  return null;
}

export default MyAccount;
