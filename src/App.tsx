import './App.css'
import { Routes, Route } from 'react-router'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Try } from './Components/Try'
import { Toaster } from "./Components/ui/sonner"

function App() {
  
  return (
    <div className='h-screen w-full bg-zinc-950 text-white/90'>
      <Toaster />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/try" element={<Try />} />
      </Routes>
    </div>
  )
}

export default App
