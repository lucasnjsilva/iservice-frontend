export default function phoneFormatter(phone: string) {
  // Remove todos os caracteres não numéricos do telefone
  const numericPhone = phone.replace(/\D/g, "");

  // Aplica a máscara no telefone formatado
  const formattedPhone = numericPhone.replace(
    /(\d{2})(\d{4,5})(\d{4})/,
    "($1) $2-$3"
  );

  return formattedPhone;
}
