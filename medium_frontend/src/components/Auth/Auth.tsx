import "./Auth.css";
import AuthInputs from "../AuthInputs/AuthInputs";
import Button from "../Button/Button";

const Auth = (props: any) => {

    const handleLinkClick = () => {
        if(props.page === "signup") {
            window.location.href = "/signin";
        } else {
            window.location.href = "/signup";
        }
    }

    const handleForgotPassword = () => {
        window.location.href = "/forgot-password";
    }

    return (
        <div className="outer-auth">
            <div className="auth-heading">
                {props.page === "signup" ? "Create an Account" : "Login to your Account"}
            </div>
            <div className="auth-subheading">
                {props.page === "signup" ? "Already have an account?" : "Create an Account"} <span className="auth-link" onClick={handleLinkClick}>{props.page === "signup" ? "Login" : "Signup"}</span>
            </div>
            <div className="all-auth-inputs">
                {props.inputs.map((input: any) => {
                    return <AuthInputs key={input} title={input} type={input} placeholder={"Enter your " + input} setInput={props.setInput} inputValues={props.inputValues}/>
                })}
            </div>
            <div className="signup-auth-button">
                <Button title={props.page === "signup" ? "Sign Up" : "Login"} onSubmit={props.onSubmit}/>
                {props.page === "signup" ? 
                null : 
                <Button title="Forgot Password?" onSubmit={handleForgotPassword}/>
                }
            </div>
        </div>
    );
}

export default Auth;
