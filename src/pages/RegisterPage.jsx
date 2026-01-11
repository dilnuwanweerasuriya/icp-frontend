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
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function register() {
        // Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return toast.error("Please fill in all fields.");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            setIsLoading(true);
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

            // If backend returns token automatically
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            navigate("/login");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            register();
        }
    };

    return (
        /* Outer Container: Centered using Flex-Col */
        <div className='w-full min-h-screen bg-[url("/bg-login.jpg")] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center p-6'>
            
            {/* Branding Section */}
            <div className="flex flex-col justify-center items-center mb-6 text-center">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] mb-4 object-contain"
                />
                <h1 className="text-2xl md:text-4xl text-gold drop-shadow-lg font-bold uppercase tracking-wide">
                    Create Your Account
                </h1>
            </div>

            {/* Register Card */}
            <div className="w-full max-w-[500px] p-8 backdrop-blur-md bg-black/40 border border-white/10 shadow-2xl rounded-3xl flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-8 text-white">Register</h2>

                <div className="w-full space-y-5">
                    {/* First and Last Name in one row on desktop */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            className="flex-1 bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg h-[45px] outline-none placeholder:text-white/50 transition-colors"
                            onChange={(e) => setFirstName(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            className="flex-1 bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg h-[45px] outline-none placeholder:text-white/50 transition-colors"
                            onChange={(e) => setLastName(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>

                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        className="w-full bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg h-[45px] outline-none placeholder:text-white/50 transition-colors"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="w-full bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg h-[45px] outline-none placeholder:text-white/50 transition-colors"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        className="w-full bg-transparent border-b-2 border-b-secondary focus:border-b-gold text-white text-lg h-[45px] outline-none placeholder:text-white/50 transition-colors"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <button
                        disabled={isLoading}
                        className={`w-full h-[55px] mt-4 bg-accent text-white text-xl border-2 border-accent hover:bg-transparent hover:border-gold font-bold rounded-2xl transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={register}
                    >
                        {isLoading ? "Creating Account..." : "Register"}
                    </button>
                </div>

                <p className="text-white mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gold font-semibold italic hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}