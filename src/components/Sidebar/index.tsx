import React, { useEffect, useState } from "react";
import AdminSidebar from "./admin";
import CustomerSidebar from "./customer";
import ProviderSidebar from "./provider";
import { UserType, UserRoles } from "@/interfaces/IUser";
import { UserData } from "@/services/isAuthenticated";

function Sidebar() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const data = UserData();

    if (data) {
      setUser(data);
    }
  }, []);

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
