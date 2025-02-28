import './App.css'
import { Routes, Route } from 'react-router'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Try } from './Components/Try'

function App() {
  
  return (
    <div className='h-full w-full'>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/try" element={<Try />} />
      </Routes>
    </div>
  )
}

export default App
