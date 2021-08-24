import React from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import CSRFinput from "../CSRFInput";

const LoginButton = ({logined, token} : {
  logined: Boolean;
  token: string;
}) => {
  const retButton: JSX.Element = !logined
    ? (<Link className="btn btn-primary m-1 p-1" to="/login" onClick={() => {}}>
      Login
    </Link>)
    : (<form method="POST" action="http://localhost:8000/common/logout/" className="d-flex flex-column">
      <CSRFinput token={token}/>
      <button type="submit" className="btn btn-dark m-1 p-1">
        Logout
      </button>
    </form>);
  return retButton;
};

export default LoginButton;
