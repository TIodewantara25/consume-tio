import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Card from './components/Card/Card'
import Dashbord from './pages/Dashbord'
import User from './pages/User' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Case from './components/Case'

function App() {
  const [count, setCount] = useState(0)

 

  return (
    <Case>

    <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
      <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
        <h4 className='text-white text-2xl'>Hallo Tio</h4>
        <p className='text-lg text-gray-400 leading-relaxed'>A JavaScript library for building user interfaces</p>
      </div>
    </div>

   
   









    {/* <Card nama = "Tio" rombel = "PPLG XI 5" rayon = "ciawi 4"/> */}


    {/* mengunakan proops children */}
    {/* <Card>
      <ul>
        <li>list 1</li>
      </ul>
    </Card>


    <Card>
      Ini Adalah Card
    </Card> */}
      {
      /* <div>
        <h1>YO</h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Tio Dewantara</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </Case>
  )
}

export default App
