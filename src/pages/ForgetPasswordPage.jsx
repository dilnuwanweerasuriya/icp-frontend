import axios from 'axios';
import React, { useState } from 'react'
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgetPasswordPage() {
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function resetPassword() {
        try {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            setLoading(true);

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/validate-otp`, {
                email,
                otp,
                newPassword
            });

            toast.success("Password reset successfully");
            setLoading(false);
            navigate('/login');
        } catch (err) {
            console.log(err);
            toast.error("Failed to reset password");
            setLoading(false);
        }
    }

    async function sendOTP() {
        setLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/send-otp/${email}`);
            toast.success("OTP sent successfully");
            setLoading(false);
            setOtpSent(true);
        } catch (err) {
            console.log(err);
            toast.error("Failed to send OTP");
            setLoading(false);
        }
    }

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            {
                loading && (
                    <Loader />
                )
            }
            {
                otpSent ?
                    <div className='w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8'>
                        <h2 className='text-2xl font-bold mb-4'>Enter OTP and New Password</h2>
                        <input type="text" placeholder="Enter OTP" className="w-full p-2 mb-4 border border-gray-300 rounded-lg" onChange={(e) => setOtp(e.target.value)} />
                        <input type="password" placeholder="Enter New Password" className="w-full p-2 mb-4 border border-gray-300 rounded-lg" onChange={(e) => setNewPassword(e.target.value)} />
                        <input type="password" placeholder="Confirm New Password" className="w-full p-2 mb-4 border border-gray-300 rounded-lg" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <button className="w-full p-2 bg-blue-500 text-white rounded-lg" onClick={resetPassword}>Reset Password</button>
                    </div>
                    :
                    <div className='w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8'>
                        <h2 className='text-2xl font-bold mb-4'>Reset Your Password</h2>
                        <input type="email" placeholder="Enter your email" className="w-full p-2 mb-4 border border-gray-300 rounded-lg" onChange={(e) => setEmail(e.target.value)} />
                        <button className="w-full p-2 bg-blue-500 text-white rounded-lg" onClick={sendOTP}>Send OTP</button>
                    </div>
            }
        </div>
    )
}
