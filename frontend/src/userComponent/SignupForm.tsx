import React from "react";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {ErrorListMsg} from "../modules/ErrorMsg";
import serverRequest from "../modules/ServerRelated";
import {FormError, webDataType} from "../types/types";

const SignupForm = ({data, setData} : {
  data: webDataType;
  setData: React.Dispatch < React.SetStateAction<webDataType> >;
}) => {
  const [signupData, setSignupData] = useState({username: "", password1: "", password2: ""});
  const [errs, setErrs] = useState<FormError[]>([]);
  const hist = useHistory();
  const signupPOST = () => {
    const reqq = new FormData();
    reqq.set("username", signupData.username);
    reqq.set("password1", signupData.password1);
    reqq.set("password2", signupData.password2);
    serverRequest({url: `http://localhost:8000/common/signup/`, method: "POST"}).then((res) => {
      if (res !== "SIGNUP") {
        setSignupData({
          ...signupData,
          password1: "",
          password2: ""
        });
        setErrs(res.errs);
      } else {
        setData({
          username: signupData.username,
          userChanges: !data.userChanges
        });
        hist.push("/");
      }
    });
  };
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };
  return (<div>
    <div className="m-3">
      <ErrorListMsg errs={errs}/>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input className="form-control" value={signupData.username} onChange={onChange} name="username" type="text"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password1" className="form-label">
          Password
        </label>
        <input className="form-control" value={signupData.password1} onChange={onChange} name="password1" type="password"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password2" className="form-label">
          Password (Type again)
        </label>
        <input className="form-control" value={signupData.password2} onChange={onChange} name="password2" type="password" onKeyPress={event => {
            if (event.key === "Enter") {
              signupPOST();
            }
          }}></input>
      </div>
      <div className="form-group d-flex align-items-center">
        <button className="btn btn-primary me-2" onClick={signupPOST}>
          SIGN UP
        </button>
        or
        <Link to="/login" className="btn btn-secondary ms-2">
          LOGIN
        </Link>
      </div>
    </div>
  </div>);
};

export default SignupForm;
