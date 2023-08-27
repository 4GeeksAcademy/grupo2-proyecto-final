import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await actions.login(email, password);
            if (store.viewLogged) {
                navigate("/movies");
            } else null;
        } catch (error) {
            console.error("An error occurred during login:", error);
        }

        e.target.reset();
    };

    return (
        <div className="container mt-5">
            <form className="login-form m-auto" onSubmit={handleSubmit}>
                <h1 className="login-form-title">Sign In</h1>
                <div className="login-form-group mb-3">
                    <input
                        type="email"
                        className="login-form-control"
                        id="inputEmail"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="login-form-group mb-3">
                    <input
                        type="password"
                        className="login-form-control"
                        id="inputPassword"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-btn-section">
                    <button type="submit" className="login-btn">Login</button>
						<div><small className="signup-link">Don't have an account?&nbsp;  
                                <Link to={"/signup"} className="signup-redirect">
                                   <i>Sign up now.</i> 
                                </Link>
					    </small></div>
                </div>
            </form>
        </div>
    )
}

export default Login;