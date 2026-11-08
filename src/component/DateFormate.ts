export default function formatEventDate(
  eventDate: string,
  eventTime: string
) {
  const date = new Date(`${eventDate}T00:00:00`);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [hours, minutes] = eventTime.split(":");

  const formattedTime = new Date(
    2000,
    0,
    1,
    Number(hours),
    Number(minutes)
  ).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    formattedDate,
    formattedTime,
  };
}