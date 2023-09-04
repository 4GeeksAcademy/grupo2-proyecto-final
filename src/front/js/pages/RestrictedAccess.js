import React from "react";


const RestrictedAccess = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1 className="mb-4">Oh oh... Seems like you have hit a wall.</h1>
          <p>You need to be signed in to have access.</p>
        </div>
      </div>
    </div>
  );
};

export default RestrictedAccess;
