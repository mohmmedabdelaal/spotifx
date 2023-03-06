import AuthForm from "../components/AuthForm";

const Singup = () => {
    return (
        <div>
            <AuthForm mode='singup'/>
        </div>
    );
};

Singup.authPage = true;
export default Singup;
