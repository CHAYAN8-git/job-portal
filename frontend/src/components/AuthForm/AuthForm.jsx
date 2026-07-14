import "./AuthForm.css";

function AuthForm({ title, children }) {
    return (
        <section className="auth-page">

            <div className="auth-card">

                <h2>{title}</h2>

                {children}

            </div>

        </section>
    );
}

export default AuthForm;