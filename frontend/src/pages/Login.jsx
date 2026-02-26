import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from "../utils"
import { useAuth } from "../contexts/AuthContexts"
import API from '../services/api'

function Login() {
  
  const { setUser } = useAuth();
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    const copyLoginInfo = {...LoginInfo};
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = LoginInfo;
        if (!email || !password) {
            return handleError('email or password is required');
        }

        try {
            const response = await API.post("/auth/login", LoginInfo);
            const result = response.data;

            if (result.success) {
            handleSuccess(result.message || "Login Successful");

            localStorage.setItem('chatabot-token', result.token);

            setUser(result.user); 

            setTimeout(() => {
                navigate('/');
            }, 1000);
            }

        } catch (error) {
            const message =
            error?.response?.data?.message ||
            error.message ||
            "Something went wrong";
            handleError(message);
        }
    };
  
  return (
    <div className='bg-[#202020] w-full h-full flex justify-center items-center'>
      <div className='bg-[#303030] rounded-lg p-[clamp(1rem,3vw,2.5rem)] font-roboto w-[clamp(16rem,50%,26rem)]'>

        <h1 className="text-4xl font-medium mb-5 text-red-500">Login</h1>
        
        <form id='signupform' onSubmit={handleLogin} className=" text-[#f1f1f1] text-[1rem] font-medium w-full flex flex-col gap-5">
          
          <div>
            <label htmlFor='username'>Email</label>
            <input 
              value = {LoginInfo.email}
              onChange={handleChange} 
              className="bg-[#202020] w-full focus:outline-red-300 focus:outline-2 rounded-[0.3rem] px-3 py-2 font-normal" 
              id='email' 
              type='text' 
              name='email'
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label>
            <input
              value = {LoginInfo.password}
              onChange={handleChange}  
              className="bg-[#202020] w-full focus:outline-red-300 focus:outline-2 rounded-[0.3rem] px-3 py-2 font-normal" 
              id='password' 
              type='password' 
              name='password'
            />
          </div>

          <button type='submit' className="bg-red-500 p-3 rounded-full font-normal cursor-pointer active:bg-red-700 active:scale-95 transition-all duration-150 text-white mt-3">Login</button>
          <span className="font-normal text-[0.85rem] m-auto">
            Don't have an account? 
            <Link to='/register' className="text-red-500 hover:text-red-700"> Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Login