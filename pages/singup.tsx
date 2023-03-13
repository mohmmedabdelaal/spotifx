import AuthForm from "../components/AuthForm";

const Singup = () => {
    return (
        <div>
            <AuthForm mode='signup'/>
        </div>
    );
};

Singup.authPage = true;
export default Singup;
