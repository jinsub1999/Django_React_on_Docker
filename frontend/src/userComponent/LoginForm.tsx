import React from "react";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {ErrorListMsg} from "../modules/ErrorMsg";
import serverRequest from "../modules/ServerRelated";
import {FormError, webDataType} from "../types/types";

const LoginForm = ({data, setData} : {
  data: webDataType;
  setData: React.Dispatch < React.SetStateAction<webDataType> >;
}) => {
  const [loginData, setLoginData] = useState({username: "", password: ""});
  const [errs, setErrs] = useState<FormError[]>([]);
  const hist = useHistory();
  const loginPOST = () => {
    const reqq = new FormData();
    reqq.set("username", loginData.username);
    reqq.set("password", loginData.password);
    serverRequest({url: `http://localhost:8000/common/login/`, method: "POST", formData: reqq}).then((res) => {
      if (res !== "OK") {
        setErrs(res.errs);
        setLoginData({
          ...loginData,
          password: ""
        });
      } else {
        setData({
          username: loginData.username,
          userChanges: !data.userChanges
        });
        hist.push("/");
      }
    });
  };
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
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
        <input className="form-control" name="username" value={loginData.username} onChange={onChange} type="text"></input>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input className="form-control" name="password" value={loginData.password} onChange={onChange} type="password" onKeyPress={event => {
            if (event.key === "Enter") {
              loginPOST();
            }
          }}></input>
      </div>
      <div className="form-group d-flex align-items-center">
        <button className="btn btn-primary me-2" onClick={loginPOST}>
          LOGIN
        </button>
        or
        <Link to="/signup" className="btn btn-secondary ms-2">
          SIGN UP
        </Link>
      </div>
    </div>
  </div>);
};

export default LoginForm;
