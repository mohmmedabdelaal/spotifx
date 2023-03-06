import AuthForm from "../components/AuthForm";

const Singin = () => {
    return (
        <div>
            <AuthForm mode='singin'/>
        </div>
    );
};

Singin.authPage = true;

export default Singin;
