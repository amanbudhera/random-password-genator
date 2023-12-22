import './App.css'
import { useEffect, useRef, useCallback, useState } from 'react';

function App() {

  let [length,setLength] = useState(8)
  let [numberallowed,setNumberallowed] = useState(false)
  let [chaallowed,setChaallowed] = useState(false)
  let[password,setPassword]= useState()

  const passwordgenrator = useCallback(()=>{
    let pass =''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberallowed) str+= '0123456789'
    if (chaallowed) str+= '!@#$%^&*{}+-=~?/|[]<>'
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()*str.length +1 )
      pass += str.charAt(char)
    }
    setPassword(pass)
  }
    ,[length,numberallowed,chaallowed,setPassword])

    useEffect(()=>{passwordgenrator()},[numberallowed,chaallowed,length,passwordgenrator])

  const passwordcoppy = useCallback(
    ()=>{
      passwordref.current?.select()
      passwordref.current?.setSelectionRange(0,16)
      window.navigator.clipboard.writeText(password)
      },
    [password]
  )
  
  const passwordref = useRef(null)

  return (
    <>
      <h1 className="text-blue-400 text-xl py-3">
        Password generator
      </h1>
      <div className='py-2'>
        <input className='border-solid border-2 border-sky-500' type="text" placeholder='password' readOnly ref={passwordref} value={password}/>
        <button  className='border-solid border-2 border-sky-500 bg-sky-500' onClick={passwordcoppy}>copy </button>
      </div>
      <div>
      <div className='py-2'>
        <input type="range" min={6} max={16} onChange={(e)=>{setLength(e.target.value)}} value={length} />
        <label htmlFor=""> length: {length}</label>
      </div>
      <div className='py-2'>
        <input type="checkbox" defaultChecked={numberallowed} onChange={()=>{
          setNumberallowed((prev)=>!prev)
        }}/>
        <label htmlFor=""> numbeer</label>
      </div>
      <div className='py-2'>
        <input type="checkbox" defaultChecked={chaallowed} onChange={()=>{
          setChaallowed((prev)=>!prev)
        }}/>
        <label htmlFor=""> special char</label>
      </div>
      </div>
    </>
  )
}

export default App
