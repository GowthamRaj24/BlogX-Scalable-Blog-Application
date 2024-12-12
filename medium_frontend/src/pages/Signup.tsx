import Quote from "../components/Quote/Quote";
import "./Signup.css";
import Auth from "../components/Auth/Auth";
import { useEffect, useState } from "react";

const Signup = () => {
    const initialInputs = {
        Username: "",
        Email: "",
        Password: "",
        Reenter_Password: ""
    };

    const [input, setInput] = useState(initialInputs);

    useEffect(()=>{
        console.log(input)
    }, [input])

    return (
        <>
            <div className="signup-main">
                <div className="signup-main-outer">
                    <Auth 
                        inputs={["Username", "Email", "Password", "Reenter_Password"]} 
                        page={"signup"} 
                        setInput={setInput}
                        inputValues={input}
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