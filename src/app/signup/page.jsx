'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Check password strength
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

        // Validate passwords match
        if (form.password !== form.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        setLoading(true);
        setMessage('');
        // Stub: Replace with real API call
        setTimeout(() => {
            setLoading(false);
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => router.push('/login'), 1500);
        }, 1000);
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
                    <div className={`px-6 py-3 rounded-lg shadow-lg text-white font-semibold flex items-center ${
                        message.includes('success') ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                        {message.includes('success') ? (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        {message}
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md">
                    {/* Signup Card */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Decorative Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-center">
                            <h2 className="text-2xl font-bold text-white">Create Account</h2>
                            <p className="text-purple-100 mt-2">Join PhoneHub today</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 relative">
                            {loading && (
                                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10 rounded-b-2xl">
                                    <div className="text-center">
                                        <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                        <p className="text-gray-600 font-medium">Creating your account...</p>
                                    </div>
                                </div>
                            )}

                            {/* Name Field */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Meter */}
                                {form.password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-500">Password strength</span>
                                            <span className={`text-xs font-medium ${
                                                passwordStrength === 0 ? 'text-gray-500' :
                                                    passwordStrength === 1 ? 'text-red-500' :
                                                        passwordStrength === 2 ? 'text-orange-500' :
                                                            passwordStrength === 3 ? 'text-yellow-500' : 'text-green-500'
                                            }`}>
                        {getPasswordStrengthText(passwordStrength)}
                      </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Terms Agreement */}
                            <div className="mb-6">
                                <label className="flex items-center">
                                    <input type="checkbox" required className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg disabled:opacity-50 disabled:transform-none disabled:shadow-none"
                            >
                                Create Account
                            </button>

                            <div className="text-center text-sm text-gray-600 mt-4">
                                Already have an account?{' '}
                                <a href="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                                    Sign in
                                </a>
                            </div>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center mt-6">
                        <p className="text-xs text-gray-500">
                            Your privacy is important to us. We'll never share your information without your permission.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}