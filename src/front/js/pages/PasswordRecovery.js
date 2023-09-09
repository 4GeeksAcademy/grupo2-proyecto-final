import Swal from 'sweetalert2';
import React, { useState } from "react";
import mov_iconlogo from "../../img/mov+icon.png";
import "../../styles/PasswordRecovery.css"

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.BACKEND_URL + '/api/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Password reset email sent successfully
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Email Sent',
          text: data.message,
        });
      } else {
        console.error('Password reset failed:', data.message);
        Swal.fire({
          icon: 'error',
          title: 'Password Reset Failed',
          text: data.message,
        });
      }
    } catch (error) {
      console.error('An error occurred during password reset:', error);
    };

    setMessage("Check your email for password reset instructions.");
    setIsSubmitted(true);
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <img src={mov_iconlogo} alt="MOV+" className="img-fluid mb-4" />
              {isSubmitted ? (
                <div className="alert alert-success">{message}</div>
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
