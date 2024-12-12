import "./AuthInputs.css";

const AuthInputs = (props:any) => {
    const handleOnChange = (e:any) => {
        const { name, value } = e.target;
        props.setInput({
            ...props.inputValues,
            [name]: value
        });
    }

    return(<>
    <div className="outer-auth-inputs">
        <div className="auth-inputs-title">
            {props.title}
        </div>
        <div className="auth-inputs">
            <input type={props.type} className="auth-input" placeholder={props.placeholder} onChange={handleOnChange}/>
        </div>
    </div>
    </>)
}

export default AuthInputs;