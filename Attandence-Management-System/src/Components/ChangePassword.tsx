import React from "react";
import "./changepassword.css";

function ChangePassword() {
  return (
    <>
    <div className="center">
        <button>Forgot Password</button>
    </div>
    <div className="popup">
    <div className="close-btn">&times;</div>
      <div className="form">
        <h1>Change Password</h1>
        <div className="form-element">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="form-element">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
        </div>
        <p>Error! Pin doesn't match</p>
        <div className="form-element-button">
          <button type="submit" className="cancel">Cancel</button>
          <button type="submit" className="save">Save</button>
        </div>
      </div>
    </div>
     
    </>
  );
}

export default ChangePassword;
