import Quote from "../components/Quote/Quote";
import "./Signup.css";
import Auth from "../components/Auth/Auth";
import { useState , useEffect} from "react";
import { SigninInput } from "@gowthamraj24n/medium-common";
import { BackendUrl , extentionUrl } from "../private/backend_url";
import axios from "axios";


const Signin = () => {
        const initialInputs = {
            email: "",
            password: "",
        };
        const [input, setInput] = useState<SigninInput>(initialInputs);

        const hangleSigninSubmit = async () => {
            await axios.post(BackendUrl + "/user" + extentionUrl + "/signin" , input)
            .then((res) => {
                window.localStorage.setItem("jwt" , res.data.jwt)
                window.location.href = "/blogs"
            })
            .catch((err) => {
                console.warn(err.response.data.error);
            });
        }

        useEffect(()=>{
            console.log(input)
        }, [input])
        
    return (
        <>
            <div className="signup-main">
                <div className="singup-main-outer">
                    <Auth inputs={[ "email" , "password"]} page={"signin"} setInput={setInput}
                        inputValues={input} onSubmit={hangleSigninSubmit}/>
                </div>
                <div className="small-invisible">
                    <Quote />
                </div>
            </div>
        </>
    );
};

export default Signin;