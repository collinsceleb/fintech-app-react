import { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import {AxiosError} from "axios";
import * as React from "react";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await loginUser(formData);
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            navigate('/dashboard')
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            console.log(axiosError.response?.data?.message)
            setError(axiosError.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-[#0c0d0e] text-white px-16 py-12 flex flex-col justify-between">
                <div>
                    <div className="bg-yellow-400 text-black w-8 h-8 flex items-center justify-center rounded-full font-bold mb-8 text-lg">
                        B.
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                        Unlock High Returns with Collateralized Equity Asset
                    </h2>
                </div>
                <div className="text-sm space-y-2">
                    <p className="flex items-center gap-2">
                        <span className="text-yellow-400">⚖️</span> Collateralized
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-yellow-400">🛡️</span> Secured
                    </p>
                    <p className="flex items-center gap-2">
                        <span className="text-yellow-400">📜</span> Licensed & regulated
                    </p>
                </div>
            </div>

            <div className="w-1/2 flex items-center justify-center bg-white px-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md space-y-5"
                >
                    <h2 className="text-2xl font-bold text-black">Sign in to Beam.</h2>
                    <p className="text-sm text-gray-500">
                        Please sign in with the your assigned login details
                    </p>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-sm text-right text-gray-500 cursor-pointer hover:underline">
                            Forgot password?
                        </p>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-black text-white rounded-full py-2 font-semibold hover:opacity-90 transition"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
