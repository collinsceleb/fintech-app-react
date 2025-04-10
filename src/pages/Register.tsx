import { useState } from 'react';
import axios, {AxiosError} from 'axios';
import * as React from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        agreeToTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            alert('You must agree to the terms and conditions');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/users/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });

            console.log('User registered:', response.data);
            alert('Registration successful!');
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            console.log(axiosError.response?.data?.message)
            alert('Registration failed');
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


            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 py-10">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <h2 className="text-[24px] font-semibold text-[#2D2D2D]">Create an account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005ADE]"
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005ADE]"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005ADE]"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#005ADE]"
                        />

                        <label className="flex items-start text-xs text-[#4B4B4B]">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mt-1 mr-2 accent-[#005ADE]"
                            />
                            I agree to <span className="font-medium text-[#005ADE] ml-1">BeamMarkets Terms</span> of Service and Privacy Policy
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-black text-white rounded-full py-2 font-semibold hover:opacity-90 transition"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#7D7D7D] mt-6">
                        Already have an account?{' '}
                        <a href="/login" className="text-[#005ADE] font-medium hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );

};

export default Register;
