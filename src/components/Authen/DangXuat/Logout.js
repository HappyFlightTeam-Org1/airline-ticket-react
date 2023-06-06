import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../../loginGlobalState/LoginContext";

export default function Logout() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(LoginContext);
    const auth2 = window.gapi.auth2.getAuthInstance();

    useEffect(() => {
        // auth2.signOut();
        if (auth2) {
            auth2.signOut();
        }
        localStorage.clear()
        sessionStorage.clear();
        dispatch({ type: '' });
        navigate('/');
    });
}