import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await actions.signUp(email, password, confirmPassword);
            if (store.viewSignUp) {
                navigate("/login");
            }

        } catch (error) {
            console.error("An error occurred during signup:", error);
            e.target.reset();
        }
    };

    return (
        <div className="signup-container">
            <form className="m-auto" onSubmit={handleSubmit}>
                <div className="container container-title signup-form-title">
                    <span className="shadows">S</span>
                    <span className="shadows">i</span>
                    <span className="shadows">g</span>
                    <span className="shadows">n</span>
                    <span className="shadows">U</span>
                    <span className="shadows">p</span>
                </div>
                <div className="signup-form-container text-center">
                    <div className="signup-form-group">
                        <label htmlFor="inputEmail" className="signup-label">Email Address</label>
                        <input
                            type="email"
                            className="signup-form-control"
                            id="inputEmail"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="inputPassword" className="signup-label">Password</label>
                        <input
                            type="password"
                            className="signup-form-control"
                            id="inputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="signup-form-group">
                        <label htmlFor="inputPassword" className="signup-label">Repeat Password</label>
                        <input
                            type="password"
                            className="signup-form-control"
                            id="inputConfirmPassword"
                            placeholder="Repeat Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="signup-btn mb-5">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;