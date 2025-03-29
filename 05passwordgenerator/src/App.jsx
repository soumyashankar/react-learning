import { useState , useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [array, setArray] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

const generatePassword = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (numberAllowed) {
    str += "0123456789";
  }

  if (charAllowed) {
    str += "!@#$%^&*()_+";
  }

  for (let i = 1; i < array; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    pass += str.charAt(char);
  }

  setPassword(pass);

}, [array, numberAllowed, charAllowed, setPassword] )

const copyPassWordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
}, [password])

useEffect(() => {generatePassword()}, [array, numberAllowed, charAllowed, generatePassword])

  return (
    <div className="w-full max-w-md shadow-md rounded-lg px-4 py-3 my-8 mx-96 bg-gray-800  text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input type="text" 
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="password"
      readOnly
      ref={passwordRef}
      />
    </div>
    <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassWordToClipboard}>copy</button>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={6}
        max={100}
        value={array} 
        className='cursor-pointer'
        onChange={(e) => {setArray(e.target.value)}}/>
        <label>Length: {array}</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberAllowed"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="numbersInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberAllowed"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
    </div>
  )
}

export default App
