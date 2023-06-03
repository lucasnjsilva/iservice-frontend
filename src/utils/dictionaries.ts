export const AttendanceStatus = (status: string) => {
  const dictionary = {
    PENDING: "PENDENTE",
    "CANCELED BY CUSTOMER": "CANCELADO PELO CLIENTE",
    "CANCELED BY PROVIDER": "CANCELADO PELO PRESTADOR",
    ATTENDED: "ATENDIDO",
  }[status];

  return dictionary;
};
