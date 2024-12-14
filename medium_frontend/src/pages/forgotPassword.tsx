import { useState } from "react";
import { BackendUrl, extentionUrl } from "../private/backend_url";
import axios from "axios";

const Quotef = () => (
    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-3xl text-white h-full flex flex-col justify-between">
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">"The Future of Blogging"</h2>
            <p className="text-lg text-white/80 leading-relaxed">
                Join our community of creative writers and tech enthusiasts. Share your stories, ideas, and expertise with the world.
            </p>
        </div>
        <div className="border-t border-white/20 pt-6 mt-auto">
            <p className="text-sm text-white/60">Developed By:</p>
            <p className="text-xl font-semibold">Gowtham Raju</p>
        </div>
    </div>
);

const ForgotPassword = () => {
    const initialInputs = {
        email: "",
        newPassword: ""
    };
    const [input, setInput] = useState(initialInputs);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPassword = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${BackendUrl}/user${extentionUrl}/reset-password`, input);
            setMessage("Password updated successfully!");
            setTimeout(() => {
                window.location.href = "/signin";
            }, 2000);
        } catch (error) {
            setMessage("Error updating password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex">
                {/* Left Side - Reset Password Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                    <div className="max-w-md mx-auto space-y-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                            <p className="mt-2 text-gray-600">Enter your email and new password</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={input.email}
                                    onChange={(e) => setInput({ ...input, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={input.newPassword}
                                    onChange={(e) => setInput({ ...input, newPassword: e.target.value })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter your new password"
                                />
                            </div>

                            {message && (
                                <div className={`p-4 ${message.includes('successfully') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} rounded-lg text-center`}>
                                    {message}
                                </div>
                            )}

                            <button
                                onClick={handleForgotPassword}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-70 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Resetting Password...
                                    </>
                                ) : (
                                    'Reset Password'
                                )}
                            </button>

                            <div className="text-center">
                                <a href="/signin" className="text-blue-600 hover:text-blue-700">
                                    Back to Sign In
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Quote */}
                <div className="hidden lg:block lg:w-1/2 p-8">
                    <Quotef />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
