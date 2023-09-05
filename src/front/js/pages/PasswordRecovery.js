import React, { useState } from "react";
import mov_iconlogo from "../../img/mov+icon.png"

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // agregar la lógica para enviar un correo de recuperación de contraseña

    setMessage("Check your email for password reset instructions.");
    setIsSubmitted(true);
  };

  return (
    <div className="container mt-5"> {/* Aumenta el margen en la parte superior */}
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <img
            src={mov_iconlogo}
            alt="MOV+"
            className="img-fluid mb-4"
          />
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
  );
};

export default PasswordRecovery;
