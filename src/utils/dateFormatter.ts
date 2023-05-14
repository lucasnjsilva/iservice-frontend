export default function dateFormatter(date: string) {
  const dateSplitted = date.split("-");
  const dateFormatted = `${dateSplitted[2]}/${dateSplitted[1]}/${dateSplitted[0]}`;

  return dateFormatted;
}
