import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  async function register() {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      toast.success("Registration successful!");

      // If backend returns token (optional)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Registration failed");
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      register();
    }
  };

  return (
    <div className='w-full h-screen bg-[url("/bg-login.jpg")] bg-center bg-cover bg-no-repeat flex'>
      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[200px] h-[200px] mb-[20px] object-cover"
        />
        <h1 className="text-[50px] text-gold drop-shadow-lg text-center font-bold">
          Plug In, Power Up, Play Hard
        </h1>
        <p className="text-[20px] text-white italic">
          Your Ultimate Destination For Gaming Gear
        </p>
      </div>

      <div className="w-[50%] h-full flex flex-col justify-center items-center">
        <div className="w-[450px] h-[700px] backdrop-blur-lg bg-white/10 shadow-2xl rounded-2xl flex flex-col justify-center items-center">
          <h1 className="text-[40px] font-bold mb-[30px] text-primary drop-shadow-md">
            Register
          </h1>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50"
            onChange={(e) => setFirstName(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50"
            onChange={(e) => setLastName(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50"
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button
            className="w-[300px] h-[50px] bg-accent text-white text-[20px] border-2 border-accent hover:bg-transparent hover:text-white hover:border-gold font-bold rounded-2xl transition-all duration-200"
            onClick={register}
          >
            Register
          </button>

          <p className="text-white mt-[20px]">
            Already have an account?{" "}
            <Link to="/login" className="text-gold italic hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
