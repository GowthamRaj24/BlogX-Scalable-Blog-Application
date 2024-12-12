import Quote from "../components/Quote/Quote";
import "./Signup.css";
import Auth from "../components/Auth/Auth";
import { useState , useEffect} from "react";


const Signin = () => {
        const initialInputs = {
            Email: "",
            Password: "",
        };
    
        const [input, setInput] = useState(initialInputs);

        useEffect(()=>{
            console.log(input)
        }, [input])
        
    return (
        <>
            <div className="signup-main">
                <div className="singup-main-outer">
                    <Auth inputs={[ "Email" , "Password"]} page={"signin"} setInput={setInput}
                        inputValues={input}/>
                </div>
                <div className="small-invisible">
                    <Quote />
                </div>
            </div>
        </>
    );
};

export default Signin;