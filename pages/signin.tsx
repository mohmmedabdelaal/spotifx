import AuthForm from "../components/AuthForm";

const Singin = () => {
    return (
        <div>
            <AuthForm mode='signin'/>
        </div>
    );
};

Singin.authPage = true;

export default Singin;
