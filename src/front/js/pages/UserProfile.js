import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../../styles/userprofile.css";

function UserProfile() {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedData = {
                email: email,
                password: password
            };

            await actions.updateProfile(updatedData);
            if (store.viewUserProfile)
            navigate("/userprofile");
        } catch (error) {
            console.error("An error occurred during profile update:", error);
        }
        e.target.reset();
    };

    return (
        <div className= "userprofile-body">
            <form className="m-auto" onSubmit={handleSubmit}>
                <h1 className="container userprofile-form-title">User Information</h1>
                <div class="userprofile-form-container text-center">
                    <div className="userprofile-form-group">
                        <input
                            type="email"
                            className="userprofile-form-control"
                            id="inputEmail"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="userprofile-form-group">
                        <input
                            type="password"
                            className="userprofile-form-control"
                            id="inputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="userprofile-btn mb-5">Update Information</button>
                </div>
            </form>
        </div>
    )
}

export default UserProfile;