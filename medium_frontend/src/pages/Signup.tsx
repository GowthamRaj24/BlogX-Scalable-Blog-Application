import Quote from "../components/Quote/Quote";
import "./Signup.css";
import SignupComponent from "../components/Signup/SignupComponent";

const Signup = () => {
    return (<>
        <div className="signup-main">
            <SignupComponent/>
            <Quote/>
        </div>
        
    </>)
}

export default Signup;