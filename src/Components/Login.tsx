
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='relative pt-16 h-screen'>
      <div className="w-full fixed top-0 left-0 py-2 px-4 bg-indigo-900">
        <span className="text-3xl">Globin Chat</span>
      </div>
      <div className='w-full h-full flex flex-col justify-center'>
        <div className='w-full flex flex-row'>
          <div className='flex-2 px-32 flex flex-col items-center'>
            <span className='text-4xl mb-12'>Login</span>
            <input className='w-full px-6 py-2 text-2xl rounded-lg border-3 border-gray-300/40 focus:outline-none focus:border-indigo-400/30' placeholder='Enter Username' />
            <input className='w-full px-6 py-2 text-2xl mt-8 rounded-lg border-3 border-gray-300/40 focus:outline-none focus:border-indigo-400/30' placeholder='Enter Password' type='password' />
            <button className='w-full w-max px-6 py-2 text-2xl mt-12 cursor-pointer rounded-lg text-white bg-indigo-900 hover:bg-indigo-700'>Login</button>
            
          </div>
          <div className='flex-3 flex flex-col leading-16 justify-center text-2xl border-l-4 border-slate-500/30 px-32'>
            <span>Don't have an account? <Link className='text-cyan-400 py-1 px-2 rounded-md hover:bg-indigo-400/20' to='/signup'>Sign up</Link></span>
            <span>OR</span>
            <span>Try the UI first - <Link className='text-cyan-400 py-1 px-2 rounded-md hover:bg-indigo-400/20' to='/try'>Here</Link></span>
            <span>OR</span>
            <span>Go back to the Home Page - <Link className='text-cyan-400 py-1 px-2 rounded-md hover:bg-indigo-400/20' to='/'>Here</Link></span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login