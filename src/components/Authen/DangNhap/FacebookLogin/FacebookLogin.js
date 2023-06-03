import FacebookLogin from 'react-facebook-login';

function FacebookLoginButton() {
    const appId = '1535535950188229';

    function onResponse(response) {
        console.log(response);
    }

    return (
        <FacebookLogin
            appId={appId}
            autoLoad={false}
            fields='name, email, picture'
            callback={onResponse}
            scope='public_profile, email'
        />
    );
}

export default FacebookLoginButton;