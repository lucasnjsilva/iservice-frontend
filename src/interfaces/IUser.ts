export type UserType = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export enum UserRoles {
  admin = "ADMIN",
  customer = "CUSTOMER",
  provider = "PROVIDER",
}
