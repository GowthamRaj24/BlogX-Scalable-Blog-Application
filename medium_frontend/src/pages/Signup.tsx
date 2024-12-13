import Quote from "../components/Quote/Quote";
import "./Signup.css";
import Auth from "../components/Auth/Auth";
import { useEffect, useState } from "react";
import { SignupInput } from "@gowthamraj24n/medium-common";
import { BackendUrl , extentionUrl } from "../private/backend_url";
import axios from "axios";

const Signup = () => {
    const initialInputs = {
        name: "",
        email: "",
        password: ""
    };

    const [input, setInput] = useState<SignupInput>(initialInputs);

    useEffect(()=>{
        console.log(input)
    }, [input])


    const hangleSignupSubmit = async () => {
        await axios.post(BackendUrl + "/user" + extentionUrl + "/signup" , input)
        .then((res) => {
            window.localStorage.setItem("jwt" , res.data.jwt)
            window.location.href = "/home"
        })
        .catch((err) => {
            console.warn(err.response.data.error);
        });

    }


    return (
        <>
            <div className="signup-main">
                <div className="signup-main-outer">
                    <Auth 
                        inputs={[ "name" , "email" , "password"]} 
                        page={"signup"} 
                        setInput={setInput}
                        inputValues={input}
                        onSubmit={hangleSignupSubmit}
                    />
                </div>
                <div className="small-invisible">
                    <Quote />
                </div>
            </div>
        </>
    );
};

export default Signup;