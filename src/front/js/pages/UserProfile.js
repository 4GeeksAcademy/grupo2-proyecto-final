import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/userprofile.css";

function UserProfile() {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.viewLogged) {
            navigate("/restricted-access");
            return;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // checks password is correct
            if (store.newPassword !== store.confirmPassword) {
                alert("New password and confirmation password do not match.");
                return;
            }

            const updatedData = {
                currentPassword: store.currentPassword,
                newPassword: store.newPassword,
            };

            await actions.updateProfile(updatedData);
        } catch (error) {
            console.error("An error has occurred while changing your password:", error);
            e.target.reset();
        }
    };

    return (
        <div>
            <div className="userprofile-body">
                <form className="m-auto" onSubmit={handleSubmit}>
                    <h1 className="container userprofile-form-title">Update Password</h1>
                    <div className="userprofile-form-container text-center">
                        <div className="userprofile-form-group">
                            <input
                                type="password"
                                className="userprofile-form-control"
                                id="inputCurrentPassword"
                                placeholder="Current Password"
                                value={store.currentPassword}
                                onChange={(e) => actions.setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="userprofile-form-group">
                            <input
                                type="password"
                                className="userprofile-form-control"
                                id="inputNewPassword"
                                placeholder="New Password"
                                value={store.newPassword}
                                onChange={(e) => actions.setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="userprofile-form-group">
                            <input
                                type="password"
                                className="userprofile-form-control"
                                id="inputConfirmPassword"
                                placeholder="Confirm Password"
                                value={store.confirmPassword}
                                onChange={(e) => actions.setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="userprofile-btn mb-5">Update Information</button>
                    </div>
                </form>
            </div>
            <div className='liney' />
        </div>
    )
}

export default UserProfile;