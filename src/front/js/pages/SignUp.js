import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await actions.signUp(email, password);
            if (store.viewSignUp) {
                navigate("/login");
            }

        } catch (error) {
            console.error("An error occurred during signup:", error);
        }

        e.target.reset();
    };

    return (
        <div className="signup-container">
            <form className="m-auto" onSubmit={handleSubmit}>
                <h1 className="container signup-form-title">Create an account to get started</h1>
                <div class="signup-form-container text-center">
                    <div className="signup-form-group">
                        <label htmlFor="inputEmail" className="signup-label">Email Address</label>
                        <input
                            type="email"
                            className="signup-form-control"
                            id="inputEmail"
                            placeholder="Enter an Email Address"
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
                            placeholder="Enter a Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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