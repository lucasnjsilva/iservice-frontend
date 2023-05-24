"use client";

import React, { useEffect, useState } from "react";
import AccountProvider from "./provider";

type UserType = {
  name: string;
  role: string;
};

function MyAccount() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setUser({ name: "Lucas", role: "provider" });
  }, []);

  if (user) {
    if (user.role === "provider") {
      return <AccountProvider />;
    }
  }

  return null;
}

export default MyAccount;
