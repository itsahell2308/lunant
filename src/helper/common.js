export const dateFormat = (dateString = "") => {
  if (!dateString) {
    return;
  }

  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  // Get the date part (28/11/24)
  // const formattedDate = date.toLocaleDateString("en-GB", options);

  // Get the time part (1:00:00 PM)
  const formattedTime = date.toLocaleTimeString("en-GB", options);

  // Combine the two
  return formattedTime;
};

export function generateRandomId() {
  const randomPart = Math.floor(Math.random() * 1000); // A 3-digit random number
  return (Date.now().toString().slice(-7) + randomPart).slice(-10);
}
