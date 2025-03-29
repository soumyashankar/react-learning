import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [counter, setCounter] = useState(5);

// let counter = 5

const addValue = () => {
  //counter = counter + 1
  setCounter((prevCounter) => prevCounter + 1)
  setCounter((prevCounter) => prevCounter + 1)
  setCounter((prevCounter) => prevCounter + 1)
  setCounter((prevCounter) => prevCounter + 1)
}

const removeValue = () => {
 // counter = counter - 1
  setCounter(counter - 1)
}

  return (
    <>   
      <h1>Chai aur react</h1>
      <h2>Counter Value : {counter}</h2>
      <br/>
      <button
      onClick={addValue}
      >Increment</button>
      <br/>
      <button
      onClick={removeValue}
      >Decrement</button>
    </>
  )
}

export default App
