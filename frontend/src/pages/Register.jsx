import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../utils"
import API from '../services/api'

function Register() {
  
  const [RegisterInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    const copyRegisterInfo = {...RegisterInfo};
    copyRegisterInfo[name] = value;
    setRegisterInfo(copyRegisterInfo);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password }  = RegisterInfo;
    if (!name || !email || !password) {
      return handleError('name, email and password are required');
    }

    try {
        const response = await API.post("/auth/register", RegisterInfo);
        const result = response.data;

        if(result.success){
            handleSuccess(result.message || "Register Successful");
            setTimeout(()=>{
            navigate('/login')
            }, 1000)
        }

    } catch (error) {
      const backendErrors = error?.response?.data?.errors;
      if (backendErrors){
        backendErrors.forEach(err => handleError(err));
      } else {
        const message = error?.response?.data?.message || error.message || "Something went wrong";
        handleError(message);
      }
    }

  }
  
  return (
    <div className='bg-[#202020] w-full h-full flex justify-center items-center'>
      <div className='bg-[#303030]  rounded-lg p-[clamp(1rem,3vw,2.5rem)] font-roboto w-[clamp(16rem,50%,26rem)]'>

        <h1 className="text-4xl font-medium mb-5 text-red-500">Register User</h1>
        
        <form id='registerform' onSubmit={handleRegister} className="text-[1rem] text-[#f1f1f1] font-medium w-full flex flex-col gap-5">
          
          <div className="">
            <label htmlFor='name' className="">Name</label>
            <input 
              value = {RegisterInfo.name}
              onChange={handleChange} 
              className="bg-[#202020] w-full focus:outline-red-300 focus:outline-2 rounded-[0.3rem] px-3 py-2 font-normal" 
              id='name' 
              type='text' 
              name='name'
              autoFocus
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label>
            <input 
              value = {RegisterInfo.email}
              onChange={handleChange} 
              className="bg-[#202020] w-full focus:outline-red-300 focus:outline-2 rounded-[0.3rem] px-3 py-2 font-normal" 
              id='email' 
              type='email' 
              name='email' 
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              value = {RegisterInfo.password}
              onChange={handleChange}  
              className="bg-[#202020] w-full focus:outline-red-300 focus:outline-2 rounded-[0.3rem] px-3 py-2 font-normal" 
              id='password' 
              type='password' 
              name='password'
            />
          </div>

          <button type='submit' className="bg-red-500 p-3 rounded-full font-normal cursor-pointer active:bg-red-700 active:scale-95 transition-all duration-150 text-white mt-3">Signup</button>
          <span className="font-normal text-[0.85rem] m-auto">
            Already have an account? 
            <Link to='/login' className="text-red-500 hover:text-red-700"> Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Register