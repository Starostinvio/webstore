export default function formatDateTime(dateTimeString) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = new Date(dateTimeString).toLocaleDateString(
    "ru-RU",
    options
  );
  return formattedDate;
}
