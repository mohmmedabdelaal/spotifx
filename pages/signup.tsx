import AuthForm from "../components/AuthForm";


const Signup = () => {
    return (
        <div>
            <AuthForm mode='signup'/>
        </div>
    );
};

Signup.authPage = true;
export default Signup;
