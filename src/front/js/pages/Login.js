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
            if (store.token) {
                navigate("/movies");
            } else null;
        } catch (error) {
            console.error("An error occurred during login:", error);
            e.target.rest();
        }
    };

    return (
        <div className="login-container">
            <form className="login-form login-box m-auto" onSubmit={handleSubmit}>
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
                    <div>
                        <span>
                            <small className="signup-link">
                                <Link to={"/password-recovery"} className="signup-redirect">
                                    Forgot Password?
                                </Link>
                            </small>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;