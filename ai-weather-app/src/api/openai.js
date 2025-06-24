export const getWeatherReport = async (prompt, weatherData, city) => {
  const response = await fetch("/api/getWeatherReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, weatherData, city }),
  });

  const data = await response.json();

  if (data.error) throw new Error(data.error);
  return data.reply;
};