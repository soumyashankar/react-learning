import { useState, useRef } from "react";
import { getWeatherReport } from "../api/openai";
import { getCityWeather } from "../api/weather";
import { extractCityName } from "../utils/extractCity";

function WeatherPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");

    const city = extractCityName(prompt);
    if (!city) {
      setResponse("Please mention a city, e.g. 'What’s the weather in Mumbai?'");
      setLoading(false);
      return;
    }

    try {
      const weatherData = await getCityWeather(city);
      const aiResponse = await getWeatherReport(prompt,weatherData, city);
      setResponse(aiResponse);
      speakText(aiResponse);
    } catch (error) {
      setResponse("Could not fetch weather. Please check the city name or try again.");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    console.log(window);
    console.log(window.webkitSpeechRecognition);
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsListening(false);
    };

    recognitionRef.current.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setPrompt(spokenText);
    };

    recognitionRef.current.start();
  };


  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;
  
    // Optional: choose a specific voice (if available)
    // const voices = window.speechSynthesis.getVoices();
    // utterance.voice = voices.find(v => v.name.includes("Google US")) || voices[0];
  
    window.speechSynthesis.speak(utterance);
  };



  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Hybrid Weather Assistant 🌦️</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="What's the weather like in Mumbai today?"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={handleAsk}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      <br></br>
      <button
          onClick={startListening}
          className="absolute right-2 top-1 text-gray-600"
          title="Speak"
        >
          {isListening ? "🎤..." : "🎤"}
        </button>
      <div className="mt-4 whitespace-pre-wrap text-left">{response}</div>
    </div>
  );
}

export default WeatherPromptBox;