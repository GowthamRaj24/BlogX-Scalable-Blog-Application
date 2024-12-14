import { useState } from "react";
import axios from "axios";
import { BackendUrl, extentionUrl } from "../private/backend_url";
import Quote from "../components/Quote/Quote";
import Button from "../components/Button/Button";
import AuthInputs from "../components/AuthInputs/AuthInputs";
import "./Signup.css";

const ForgotPassword = () => {
    const initialInputs = {
        email: "",
        newPassword: ""
    };
    const [input, setInput] = useState(initialInputs);
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        try {
            await axios.post(`${BackendUrl}/user${extentionUrl}/reset-password`, input);
            setMessage("Password updated successfully!");
            setTimeout(() => {
                window.location.href = "/signin";
            }, 2000);
        } catch (error) {
            setMessage("Error updating password");
        }
    };

    return (
        <div className="signup-main mb-8 flex justify-center items-center min-h-screen h-full">
            <div className="singup-main-outer">
                <div className="auth-container text-center">
                    <h1 className="text-3xl font-bold mb-8">Reset Password</h1>
                    <AuthInputs 
                        key="email" 
                        title="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        setInput={setInput} 
                        inputValues={input}
                    />
                    <AuthInputs 
                        key="newPassword" 
                        title="newPassword" 
                        type="password" 
                        placeholder="Enter your new password" 
                        setInput={setInput} 
                        inputValues={input}
                    />
                    <div className="signup-auth-button">
                        <Button title="Reset Password" onSubmit={handleForgotPassword} />
                    </div>
                    {message && (
                        <p className="mt-4 text-center text-green-600">{message}</p>
                    )}
                </div>
            </div>
            <div className="small-invisible">
                <Quote />
            </div>
        </div>
    );
};

export default ForgotPassword;
