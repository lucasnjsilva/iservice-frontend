export type UserType = {
  id: string;
  token: string;
  role: string;
};

export enum UserRoles {
  admin = "ADMIN",
  customer = "CUSTOMER",
  provider = "PROVIDER",
}
