import React, { useContext, useState } from "react";
import { Context } from '../store/appContext';
import mov_iconlogo from "../../img/mov+icon.png";
import "../../styles/PasswordRecovery.css"

const PasswordRecovery = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    actions.passwordRecovery(email);
  };

  return (
    <div className="main-container mt-5">
      <div className="content">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <img src={mov_iconlogo} alt="MOV+" className="img-fluid mb-4" />
              {store.isSubmitted ? (
                <div className="alert alert-success">{store.message}</div>
              ) : (
                <div>
                  <h2>Forgot Your Password?</h2>
                  <p>Please enter your email address. We will send you a link to reset your password.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send Reset Link
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
