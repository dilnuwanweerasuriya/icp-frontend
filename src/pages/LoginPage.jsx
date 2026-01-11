import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    async function login() {
        if (!email || !password) {
            return toast.error("Please fill in all fields");
        }

        try {
            setIsLoading(true);
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/login', {
                email: email,
                password: password
            });
            
            localStorage.setItem("token", res.data.token);
            toast.success("Login successful");

            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
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
                setIsLoading(true);
                const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/google', {
                    token: tokenResponse.access_token
                });
                localStorage.setItem("token", res.data.token);
                
                if (res.data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
                toast.success("Google login successful");
            } catch (err) {
                console.error(err);
                toast.error("Google login failed");
            } finally {
                setIsLoading(false);
            }
        }
    });

    return (
        /* Outer Container: Centered using Flex-Col */
        <div className='w-full min-h-screen bg-[url("/bg-login.jpg")] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center p-4'>
            
            {/* Branding Section (Above the card) */}
            <div className="flex flex-col justify-center items-center mb-8 text-center">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] mb-4 object-contain"
                />
                <h1 className="text-3xl md:text-5xl text-gold drop-shadow-lg font-bold uppercase tracking-wide">
                    Plug In, Power Up, Play Hard
                </h1>
                <p className="text-lg md:text-xl text-white italic mt-2 opacity-90">
                    Your Ultimate Destination For Gaming Gear
                </p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-[450px] p-8 backdrop-blur-md bg-black/30 border border-white/10 shadow-2xl rounded-3xl flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-10 text-white drop-shadow-md">
                    Login
                </h2>

                <div className="w-full space-y-6">
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        className="w-full h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg outline-none placeholder:text-white/50 transition-colors"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    
                    <div className="flex flex-col">
                        <input
                            type="password"
                            placeholder="Your Password"
                            value={password}
                            className="w-full h-[50px] bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg outline-none placeholder:text-white/50 transition-colors"
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <Link
                            to="/forgot-password"
                            className="text-gold text-sm mt-2 text-right hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        disabled={isLoading}
                        className={`w-full h-[55px] bg-accent text-white text-xl border-2 border-accent hover:bg-transparent hover:border-gold font-bold rounded-2xl transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={login}
                    >
                        {isLoading ? "Authenticating..." : "Login"}
                    </button>

                    <div className="flex items-center gap-4 my-2">
                        <div className="flex-1 h-[1px] bg-white/20"></div>
                        <p className="text-white text-sm">OR</p>
                        <div className="flex-1 h-[1px] bg-white/20"></div>
                    </div>

                    <button
                        disabled={isLoading}
                        className="w-full h-[55px] bg-white/10 text-white text-xl border-2 border-white/20 hover:bg-white/20 hover:border-gold font-bold rounded-2xl transition-all duration-300 flex justify-center items-center gap-3"
                        onClick={() => handleGoogleLogin()}
                    >
                        <BsGoogle className="text-red-500" /> Google Login
                    </button>
                </div>

                <p className="text-white mt-8">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-gold font-semibold italic hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}