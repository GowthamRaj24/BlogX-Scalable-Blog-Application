import "./Button.css";
import React from "react";

const Button = (props:any) =>{
   
    const [loading, setLoading] = React.useState(false);

    const handleClick = async () => {
        setLoading(true);
        await props.onSubmit();
        setLoading(false);
    };

    return (
        <button className="btn" ref={props.link} onClick={handleClick} disabled={loading}>
            {loading ? "Loading..." : props.title}
        </button>
    );
}

export default Button;