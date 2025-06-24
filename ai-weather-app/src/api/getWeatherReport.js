export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }
  
    const { prompt, city, weatherData } = req.body;
  
    if (!prompt || !city || !weatherData) {
      return res.status(400).json({ error: "Missing required data" });
    }
  
    const apiKey = process.env.OPENAI_API_KEY; // ✅ Safe here
  
    const enrichedPrompt = `
  You are a weather assistant. The user asked: "${prompt}"
  
  Here is the real-time weather data for ${city}:
  - Temperature: ${weatherData.main.temp}°C
  - Condition: ${weatherData.weather[0].description}
  - Humidity: ${weatherData.main.humidity}%
  - Wind Speed: ${weatherData.wind.speed} m/s
  
  Using this info, answer the user's question in a friendly, conversational way.
  `;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: enrichedPrompt }],
          max_tokens: 150,
        }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        return res.status(500).json({ error: data.error.message });
      }
  
      const reply = data.choices[0].message.content.trim();
      res.status(200).json({ reply });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "OpenAI call failed" });
    }
  }