import React, { useEffect, useState } from "react";
import AdminSidebar from "./admin";
import CustomerSidebar from "./customer";
import ProviderSidebar from "./provider";
import UserData from "@/fake/user.json";
import { UserType, UserRoles } from "@/interfaces/IUser";

function Sidebar() {
  const [user, setUser] = useState<UserType>();
  useEffect(() => setUser(UserData), []);

  if (user) {
    if (user.role === UserRoles.admin) {
      return <AdminSidebar />;
    }

    if (user.role === UserRoles.customer) {
      return <CustomerSidebar />;
    }

    if (user.role === UserRoles.provider) {
      return <ProviderSidebar />;
    }
  }

  return null;
}

export default Sidebar;
