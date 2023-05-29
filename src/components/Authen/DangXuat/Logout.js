import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../../loginGlobalState/LoginContext";

export default function Logout() {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(LoginContext);

    useEffect(() => {
        localStorage.removeItem('email');
        localStorage.removeItem('account');
        localStorage.removeItem('login');
        dispatch({ type: '' });
        navigate('/');
    });
}