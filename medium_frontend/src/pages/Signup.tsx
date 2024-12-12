import Quote from "../components/Quote/Quote";
import "./Signup.css";
import Auth from "../components/Auth/Auth";

const Signup = () => {
    return (
        <>
            <div className="signup-main">
                <div className="singup-main-outer">
                    <Auth inputs={["Username" , "Email" , "Password", "Reenter Password"]} page={"signup"} />
                </div>
                <div className="small-invisible">
                    <Quote />
                </div>
            </div>
        </>
    );
};

export default Signup;