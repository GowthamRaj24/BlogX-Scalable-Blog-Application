import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../private/backend_url";

const [userLoading , setUserLoading] = useState(true);
const [userDetails , setUserDetails] = useState({name:"_"});
const [jwt , setJWT] = useState(window.localStorage.getItem("jwt"));


useEffect(()=>{
    const fetchUserDetails = async () => {
        await axios.post(BackendUrl + "/user" + "/JWTToUser", {id : jwt})
        .then((res) => {
            setUserDetails(res.data.user);
            console.log(res.data.user);
            setUserLoading(false);
        })
        .catch((err) => {
            console.warn(err.response.data);
        })
    }
    fetchUserDetails();
} , [jwt]);

useEffect(()=>{
    setJWT(window.localStorage.getItem("jwt"));
} , [window.localStorage.getItem("jwt")]);


export {userDetails , userLoading};