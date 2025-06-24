import axios from "axios";

export const getCityWeather = async (cityName) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  return response.data;
};