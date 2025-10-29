import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function login(){
    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/login', {
        email: email, 
        password: password
      })
      console.log(res)
      localStorage.setItem("token", res.data.token)
      if(res.data.role == "admin"){
        navigate("/admin")
      }else{
       navigate("/")
      }
      toast.success("Login successful")
    } catch (err) {
      console.log(err);
      toast.error("Login failed")
    }
  }

  return (
    <div className='w-full h-screen bg-[url("/bg-login.jpg")] bg-center bg-cover bg-no-repeat flex'>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[200px] h-[200px] mg-[20px] object-cover"
        />
        <h1 className="text-[50px] text-gold text-shadow-md text-center font-bold">
          Plug In, Power Up, Play Hard
        </h1>
        <p className="text-[20px] text-white italic">
          Your Ultimate Destination For Gaming Gear
        </p>
      </div>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center">
          <h1 className="text-[40px] font-bold mb-[50px] text-primary text-shadow-white">
            Login
          </h1>
          <input
            type="email"
            placeholder="Your Email"
            className="w-[300px] h-[50px] bg-transparent border-b border-b-accent focus:border-b-gold text-white text-[20px] mb-[20px] outline-none"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Your Password"
            className="w-[300px] h-[50px] bg-transparent border-b border-b-accent focus:border-b-gold text-white text-[20px] mb-[20px] outline-none"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link
            to="/reset"
            className="text-gold not-italic w-[300px] mb-[20px] text-right hover:underline"
          >
            Forgot your password?{" "}
          </Link>
          <button className="w-[300px] h-[50px] bg-accent text-white text-[20px] border-[2px] border-accent hover:bg-transparent hover:text-accent font-bold rounded-2xl" onClick={login}>
            Login
          </button>
          <p className="text-white not-italic mt-[5px]">
            Don't have an account?{" "}
            <Link to="/register" className="text-gold italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
