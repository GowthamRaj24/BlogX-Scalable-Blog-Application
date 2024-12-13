import { useEffect, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../private/backend_url";

const useUserDetails = () => {
    const [userLoading, setUserLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({ name: "_" });
    const [jwt, setJWT] = useState(localStorage.getItem("jwt"));

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (jwt) {
                try {
                    const response = await axios.post(BackendUrl + "/user/JWTToUser", {
                        token: jwt
                    });
                    setUserDetails(response.data.user);
                    setUserLoading(false);
                } catch (err) {
                    console.warn(err);
                    setUserLoading(false);
                }
            }
        };

        fetchUserDetails();
    }, [jwt]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token !== jwt) {
            setJWT(token);
        }
    }, [localStorage.getItem("jwt")]);

    return { userDetails, userLoading };
};

export default useUserDetails;
