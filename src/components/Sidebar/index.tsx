import React, { useEffect, useState } from "react";
import AdminSidebar from "./admin";
import CustomerSidebar from "./customer";
import ProviderSidebar from "./provider";

enum UserRoles {
  admin = "ADMIN",
  customer = "CUSTOMER",
  provider = "PROVIDER",
}

type UserTypes = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
};

function Sidebar() {
  const [user, setUser] = useState<UserTypes>();

  useEffect(() => {
    const data = {
      id: "7e07741a-ff0b-4013-b605-ff910c5368c7",
      name: "Lucas J.",
      email: "lucasnathanj@gmail.com",
      role: UserRoles.provider,
    };

    setUser(data);
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
