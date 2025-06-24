import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherPromptBox from './components/WeatherPromptBox'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <WeatherPromptBox />
    </div>
  );
}

export default App
