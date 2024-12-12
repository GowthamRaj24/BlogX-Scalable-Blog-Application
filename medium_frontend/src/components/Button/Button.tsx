import "./Button.css";

const Button = (props:any) =>{
    return(<>
    <button className="btn" ref={props.link}>{props.title}</button>
    </>)
}

export default Button;