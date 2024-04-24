import React, { useState } from 'react'
import logo from "../pic/logoipsum-321.svg"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    axios.defaults.withCredentials=true
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const isLoggedIn = true
        axios.post("http://localhost:3000/api/login",{username,password,isLoggedIn})
        .then((e)=>{
            console.log(e.data);
            if(e.data === "Login successfully"){
            alert(e.data)
            navigate("/")
            localStorage.setItem("username",username)
            }
            if(e.data ==="Login unsuccessfully"){
                alert("Password Incorrect")
                navigate("/login")
            }if(e.data ==="Invalid Username or Password"){
                alert("Invalid Username or Password")
                navigate("/login")
            }if(e.data==="Invalid username or Password"){
                alert("Username incorrect")
            }
        })
        .catch((err)=>{
            console.log("Login error",err)
        })

    }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex place-content-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-80 " src={logo} alt="logo"/>
             
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" method='POST' onSubmit={handleSubmit}>
              <div>
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" onChange={(e)=>setUsername(e.target.value)}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  
                  {/* type="submit" */}
                  <div className='flex place-content-center'>
                  <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-35">Login</button>
                  </div>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Do not have an account? <Link to="/reg" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default Login
