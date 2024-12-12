import "./AuthInputs.css";

const AuthInputs = (props:any) => {
    return(<>
    <div className="outer-auth-inputs">
        <div className="auth-inputs-title">
            {props.title}
        </div>
        <div className="auth-inputs">
            <input type={props.type} className="auth-input" placeholder={props.placeholder} />
        </div>
    </div>
    </>)
}

export default AuthInputs;