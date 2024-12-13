import { useEffect } from "react";
import "./AuthInputs.css";


const AuthInputs = (props: any) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        props.setInput({
            ...props.inputValues,
            [name]: value
        });
    }

    useEffect(()=>{
        console.log(props.inputValues)
    } , [])

    return(<>
    <div className="outer-auth-inputs">
        <div className="auth-inputs-title">
            {props.title}
        </div>
        <div className="auth-inputs">
            <input type={props.title} className="auth-input" placeholder={"Enter your "+props.title} onChange={handleOnChange} name={props.title}/>
        </div>
    </div>
    </>)
}

export default AuthInputs;