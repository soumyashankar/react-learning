import axios from "axios";

const openaiApi = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  },
}
);

export const getWeatherReport = async (userPrompt, weatherData, city) => {
    console.log('weather data', weatherData);
    const enrichedPrompt = `
  You are a weather assistant. The user asked: "${userPrompt}"
  
  Here is the real-time weather data for ${city}:
  - Temperature: ${weatherData.main.temp}°C
  - Condition: ${weatherData.weather[0].description}
  - Humidity: ${weatherData.main.humidity}%
  - Wind Speed: ${weatherData.wind.speed} m/s
  
  Using this info, answer the user's question in a friendly, conversational way.
  `;
  
    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: enrichedPrompt }
      ],
      max_tokens: 150,
    };
    console.log('body', body);
    const response = await openaiApi.post("/chat/completions", body);
    console.log(response.data.choices[0].message.content.trim())
    return response.data.choices[0].message.content.trim();
  };