import UserData from "@/fake/user.json";
import { UserRoles } from "@/interfaces/IUser";

export function isAdmin() {
  if (UserData.role === UserRoles.admin) {
    return true;
  }

  return false;
}

export function isProvider() {
  if (UserData.role === UserRoles.provider) {
    return true;
  }

  return false;
}

export function isCustomer() {
  if (UserData.role === UserRoles.customer) {
    return true;
  }

  return false;
}
