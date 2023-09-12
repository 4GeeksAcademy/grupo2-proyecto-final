import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/userprofile.css";

function PasswordReset(props) {
    const { store, actions } = useContext(Context);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.passwordReset(password, confirmPassword, token);
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div>
            <div className="userprofile-body">
                <form className="m-auto" onSubmit={handleSubmit}>
                    <h1 className="container userprofile-form-title">Reset Password</h1>
                    <div className="userprofile-form-container text-center">
                        <div className="userprofile-form-group">
                            <input
                                type="password"
                                className="userprofile-form-control"
                                id="inputNewPassword"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="userprofile-form-group">
                            <input
                                type="password"
                                className="userprofile-form-control"
                                id="inputConfirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="userprofile-btn mb-5">Submit</button>
                    </div>
                </form>
            </div>
            <div className='liney' />
        </div>
    )
}

export default PasswordReset;