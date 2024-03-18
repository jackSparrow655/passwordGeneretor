import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)
  

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "~!@#$%^&*()_+"

    for (let i = 0; i <  length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  } , [length, numberAllowed, charAllowed])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  const copyPassword = useCallback(()=>{
    passwordRef.current.select()
    passwordRef.current.setSelectionRange(0,50)
    console.log(passwordRef.current.value)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center font-extrabold mb-2 text-2xl'>password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        ref={passwordRef}
        readOnly>
        </input>
        <button className='outline-none, bg-blue-800 text-white px-4 py-0.5 shrink-0 '
        onClick={copyPassword}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input 
          type='range'
          min={0}
          max={30}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
          ></input>
          <label className='text-sm font-bold'>length: {length}</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev) => !prev)
          }}></input>
          <label className='text-sm font-bold'>Numbers</label>
        
        </div>
        <div className='flex item-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setcharAllowed((prev) => !prev)
          }}></input>
          <label className='text-sm font-bold'>charecter</label>
        
        </div>
      </div>
      </div>
    </>
  )
}

export default App
