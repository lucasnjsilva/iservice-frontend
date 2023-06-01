import { UserType } from "@/interfaces/IUser";
import useLocalStorage from "@/utils/useLocalStorage";

export const UserData = () => {
  const data: UserType | null = useLocalStorage.get("user");

  return data;
};

const isAuthenticated = () => {
  const UserData: UserType | null = useLocalStorage.get("user");

  if (UserData) {
    return true;
  }

  return false;
};

export default isAuthenticated;
