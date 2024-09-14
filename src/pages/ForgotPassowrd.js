import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/forgot-password', { email });
            setMessage('Password reset link sent to your email');
        } catch (err) {
            setMessage('Error sending password reset email');
        }
    };

    return (
        <div className="mx-auto container p-4 ">
            <div className="bg-white p-5 w-full max-w-sm mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Forgot Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="email"
                        >
                            Email Address:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[160px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
                    >
                        Send Reset Link
                    </button>
                </form>
                <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

                {message && (

                    <p className="mt-4 text-center text-red-600 font-medium">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
