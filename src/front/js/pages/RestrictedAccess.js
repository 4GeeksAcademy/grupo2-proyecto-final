import React from "react";

const RestrictedAccess = () => {
  return (
    <div className="container policy-container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h1 className="mb-4">Whoops!!... Seems like you have hit a wall.</h1>
              <span role="img" aria-label="Acceso Restringido" style={{ fontSize: "3rem" }}>
                🚫
              </span>
              <p>You need to be signed in to have access.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictedAccess;
