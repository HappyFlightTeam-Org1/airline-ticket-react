import TwitterLogin from "react-twitter-login";

function TwitterLoginButton() {
    function handleLogin(response) {
        console.log(response);
    }
    return (
        <TwitterLogin
            authCallback={handleLogin}
            consumerKey='dnlVM2xLQTBrek01UG5DaE1BV0o6MTpjaQ'
            consumerSecret='X8pR-l_yKDUe_CeVBbjNVnyQeB2j8YwLPctcxo_EUHp-Yno3Bv'
            callbackUrl="http://localhost:3000/"
        />
    );
}

export default TwitterLoginButton;