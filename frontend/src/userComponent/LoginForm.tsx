import React from "react";
import {Link} from "react-router-dom";
import CSRFinput from "../CSRFInput";
import ErrorMsg from "../ErrorMsg";

const LoginForm = ({token} : {
  token: string
}) => {
  return (<div>
    <form className="m-3" method="POST" action="http://localhost:8000/common/login/">
      <CSRFinput token={token}/>
      <ErrorMsg/>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input className="form-control" name="username" type="text"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input className="form-control" name="password" type="password"></input>
      </div>
      <div className="form-group d-flex align-items-center">
        <button type="submit" className="btn btn-primary me-2">
          LOGIN
        </button>
        or
        <Link to="/signup" className="btn btn-secondary ms-2">
          SIGN UP
        </Link>
      </div>
    </form>
  </div>);
};

export default LoginForm;
