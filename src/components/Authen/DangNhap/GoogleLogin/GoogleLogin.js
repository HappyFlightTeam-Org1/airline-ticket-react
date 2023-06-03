import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoginContext from '../../../../loginGlobalState/LoginContext';

const clientId = '421616323507-l2dd3nj89jlrfrtbn86auslagqhkhs60.apps.googleusercontent.com';

function GoogleLoginButton() {
    const navigate = useNavigate();
    const {state, dispatch } = useContext(LoginContext);

    function onSuccess(result) {
        console.log('Login success! Current user: ', result.profileObj);
        let formData = new FormData();
        formData.append('email', result.profileObj.email);
        formData.append('name', result.profileObj.name);
        formData.append('googleId', result.profileObj.googleId);
        axios
            .post('http://localhost:8080/nguoi-dung/google-login', formData)
            .then(response => {
                Cookies.set("jwt", response.data.jwt, { expires: 30 });
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("account", response.data.email);
                if (response.data.role === "ROLE_USER") {
                    localStorage.setItem("login", "user");
                    dispatch({ type: "USER" });
                } else {
                    dispatch({ type: "ADMIN" });
                    localStorage.setItem("login", "admin");
                }
                toast.success("Đăng nhập thành công");
                navigate("/");
            })
            .catch(err => toast.error(err));
    }

    function onFailure(result) {
        // toast.error(`Có lỗi đã xảy ra trong quá trình đăng nhập. ${result}`);
        console.log(result);
    }

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    );
}

export default GoogleLoginButton;