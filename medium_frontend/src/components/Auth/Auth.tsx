import "./Auth.css";
import AuthInputs from "../AuthInputs/AuthInputs";
import Button from "../Button/Button";

const Auth = (props: any) => {
    return (
        <div className="outer-auth">
            <div className="auth-heading">
                {props.page === "signup" ? "Create an Account" : "Login to your Account"}
            </div>
            <div className="auth-subheading">
                {props.page === "signup" ? "Already have an account?" : "Create an Account"} <span className="auth-link">{props.page === "signup" ? "Login" : "Signup"}</span>
            </div>
            <div className="all-auth-inputs">
                {props.inputs.map((input: any) => {
                    return <AuthInputs key={input} title={input} type={input} placeholder={"Enter your " + input} />
                })}
            </div>
            <div className="signup-auth-button">
                <Button title={props.page === "signup" ? "Sign Up" : "Login"} />
                {props.page === "signup" ? 
                null : 
                <Button title="Forgot Password?" />
                }
            </div>
        </div>
    );
}

export default Auth;
