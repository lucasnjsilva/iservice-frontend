export const cpfFormatter = (cpf: string) => {
  const cleanedCPF = cpf.replace(/\D/g, "");

  const formattedCPF = cleanedCPF.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    "$1.$2.$3-$4"
  );

  return formattedCPF;
};

export const cnpjFormatter = (cnpj: string) => {
  const cleanedCNPJ = cnpj.replace(/\D/g, "");

  const formattedCNPJ = cleanedCNPJ.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );

  return formattedCNPJ;
};
