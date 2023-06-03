import { getToken } from "./isAuthenticated";

export const requestHeader = {
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
  "Content-Type": "application/json",
};
