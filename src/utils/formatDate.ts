export function formatDate(isoDateString: Date) {
  const isoDate = new Date(isoDateString);
  const year = isoDate.getFullYear();
  const month = String(isoDate.getMonth() + 1).padStart(2, "0");
  const day = String(isoDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatTimestampzToDate(timestampz: string) {
  const date = new Date(timestampz);
  return date.toLocaleDateString("fr-FR");
}
