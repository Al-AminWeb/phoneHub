'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'password') {
            let strength = 0;
            if (value.length >= 8) strength += 1;
            if (/[A-Z]/.test(value)) strength += 1;
            if (/[0-9]/.test(value)) strength += 1;
            if (/[^A-Za-z0-9]/.test(value)) strength += 1;
            setPasswordStrength(strength);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Call your backend API to create the user
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            setMessage('Signup successful! Logging you in...');

            // Auto login user after signup
            const loginRes = await signIn('credentials', {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (loginRes?.error) {
                setMessage('Account created, but login failed. Please log in manually.');
                router.push('/login');
            } else {
                router.push('/products');
            }
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength === 0) return 'bg-gray-200';
        if (strength === 1) return 'bg-red-500';
        if (strength === 2) return 'bg-orange-500';
        if (strength === 3) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = (strength) => {
        if (strength === 0) return 'Very Weak';
        if (strength === 1) return 'Weak';
        if (strength === 2) return 'Medium';
        if (strength === 3) return 'Strong';
        return 'Very Strong';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
            <Navbar />

            {message && (
                <div className="fixed top-20 right-6 z-50 animate-fade-in">
                    <div
                        className={`px-6 py-3 rounded-lg shadow-lg text-white font-semibold flex items-center ${
                            message.toLowerCase().includes('success')
                                ? 'bg-green-500'
                                : 'bg-red-500'
                        }`}
                    >
                        {message.toLowerCase().includes('success') ? (
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                        {message}
                    </div>
                </div>
            )}

            {/* Card */}
            <div className="flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
                            <h2 className="text-2xl font-bold text-white">Create Account</h2>
                            <p className="text-purple-100 mt-2">Join PhoneHub today</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 relative">
                            {loading && (
                                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-b-2xl">
                                    <div className="text-center">
                                        <svg
                                            className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-3"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v8H4z"
                                            ></path>
                                        </svg>
                                        <p className="text-gray-600 font-medium">
                                            Creating your account...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className=" text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className=" text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>

                                {form.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">
                        Password strength
                      </span>
                                            <span
                                                className={`text-xs font-medium ${
                                                    passwordStrength === 0
                                                        ? 'text-gray-500'
                                                        : passwordStrength === 1
                                                            ? 'text-red-500'
                                                            : passwordStrength === 2
                                                                ? 'text-orange-500'
                                                                : passwordStrength === 3
                                                                    ? 'text-yellow-500'
                                                                    : 'text-green-500'
                                                }`}
                                            >
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                                                    passwordStrength
                                                )}`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="mb-6">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        required
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                                        <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{' '}
                                        and{' '}
                                        <a
                                            href="/privacy"
                                            className="text-blue-600 hover:underline"
                                        >
                      Privacy Policy
                    </a>
                  </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md disabled:opacity-50"
                            >
                                Create Account
                            </button>

                            <div className="text-center text-sm text-gray-600 mt-4">
                                Already have an account?{' '}
                                <a
                                    href="/login"
                                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                                >
                                    Sign in
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-500">
                            Your privacy is important to us. We'll never share your
                            information without your permission.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
