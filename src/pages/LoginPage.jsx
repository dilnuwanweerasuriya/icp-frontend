import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login() {
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/login', {
                email: email,
                password: password
            });
            localStorage.setItem("token", res.data.token);
            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
            toast.success("Login successful");
        } catch (err) {
            console.log(err);
            toast.error("Login failed");
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/google', {
                    token: tokenResponse.access_token
                });
                localStorage.setItem("token", res.data.token);
                if (res.data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                toast.success("Login successful");
            } catch (err) {
                console.log(err);
                toast.error("Login failed");
            }
        }
    });

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
                <div className="w-[450px] h-[600px] backdrop-blur-lg bg-white/10 shadow-2xl rounded-2xl flex flex-col justify-center items-center">
                    <h1 className="text-[40px] font-bold mb-[50px] text-primary drop-shadow-md">
                        Login
                    </h1>
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50 transition-colors"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        type="password"
                        placeholder="Your Password"
                        value={password}
                        className="w-[300px] h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-[20px] mb-[20px] outline-none placeholder:text-white/50 transition-colors"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        onKeyPress={handleKeyPress}
                    />
                    <Link
                        to="/forgot-password"
                        className="text-gold w-[300px] mb-[20px] text-right hover:underline transition-all"
                    >
                        Forgot your password?
                    </Link>
                    <button
                        className="w-[300px] h-[50px] bg-accent text-white text-[20px] border-2 border-accent hover:bg-transparent hover:text-white hover:border-gold font-bold rounded-2xl transition-all duration-200"
                        onClick={login}
                    >
                        Login
                    </button>

                    <p className="text-white my-4">or</p>

                    <button
                        className="w-[300px] h-[50px] bg-accent text-white text-[20px] border-2 border-accent hover:bg-transparent hover:text-white hover:border-gold font-bold rounded-2xl transition-all duration-200"
                        onClick={handleGoogleLogin}
                    >
                        Login in with <BsGoogle className="inline-block" />
                    </button>
                    <p className="text-white mt-[20px]">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-gold italic hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}