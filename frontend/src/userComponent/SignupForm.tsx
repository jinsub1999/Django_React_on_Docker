import React from "react";
import {Link} from "react-router-dom";
import CSRFinput from "../CSRFInput";
import ErrorMsg from "../ErrorMsg";

const SignupForm = ({token} : {
  token: string
}) => {
  return (<div>
    <form className="m-3" method="POST" action="http://localhost:8000/common/signup/">
      <CSRFinput token={token}/>
      <ErrorMsg/>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input className="form-control" name="username" type="text"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password1" className="form-label">
          Password
        </label>
        <input className="form-control" name="password1" type="password"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password2" className="form-label">
          Password (Type again)
        </label>
        <input className="form-control" name="password2" type="password"></input>
      </div>
      <div className="form-group d-flex align-items-center">
        <button type="submit" className="btn btn-primary">
          SIGN UP
        </button>
      </div>
    </form>
  </div>);
};

export default SignupForm;
