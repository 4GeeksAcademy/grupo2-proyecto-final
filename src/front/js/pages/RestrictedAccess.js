import React from "react";
import "../../styles/RestrictedAccess.css"

const RestrictedAccess = () => {
  return (
    <div className="main-container mt-5">
      <div className="content">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="text-center">
              <div className="alert alert-danger" role="alert">
  <h1 className="mb-4">Whoops!!... Seems like you have hit a wall.</h1>
  <img src="https://seeklogo.com/images/G/Ghostbusters-logo-CC20C1F0CE-seeklogo.com.png" alt="Ghostbusters" className="emoji" />
  <p>You need to be signed in to have access.</p>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer">
        {/* Contenido del footer */}
      </footer>
    </div>
  );
};

export default RestrictedAccess;
