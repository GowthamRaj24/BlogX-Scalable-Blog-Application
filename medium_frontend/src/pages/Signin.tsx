import Quote from "../components/Quote/Quote";
import "./Signup.css";
import Auth from "../components/Auth/Auth";

const Signin = () => {
    return (
        <>
            <div className="signup-main">
                <div className="singup-main-outer">
                    <Auth inputs={[ "Email" , "Password"]} page={"signin"} />
                </div>
                <div className="small-invisible">
                    <Quote />
                </div>
            </div>
        </>
    );
};

export default Signin;