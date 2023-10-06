import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Users from './Pages/Users'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Users></Users>
    </>
  )
}

export default App
