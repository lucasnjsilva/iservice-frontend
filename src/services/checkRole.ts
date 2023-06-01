import { UserType, UserRoles } from "@/interfaces/IUser";
import useLocalStorage from "@/utils/useLocalStorage";

export function isAdmin() {
  const UserData: UserType | null = useLocalStorage.get("user");

  if (UserData && UserData.role === UserRoles.admin) {
    console.log(UserData.role);
    return true;
  }

  return false;
}

export function isProvider() {
  const UserData: UserType | null = useLocalStorage.get("user");

  if (UserData && UserData.role === UserRoles.provider) {
    return true;
  }

  return false;
}

export function isCustomer() {
  const UserData: UserType | null = useLocalStorage.get("user");

  if (UserData && UserData.role === UserRoles.customer) {
    return true;
  }

  return false;
}
