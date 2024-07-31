import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

function Auth({ authRoute }) {

    let body
    body = (
        <>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
        </>
    )
    return (  
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Movies World</h1>
                    <h4>Watch movies anywhere</h4>
                    {body}
                </div>
            </div>
        </div>
    );
}

export default Auth;