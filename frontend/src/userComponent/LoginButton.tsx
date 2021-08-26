import axios from "axios";
import React from "react";
import {Link, useHistory} from "react-router-dom";
import {webDataType} from "../types/types";
const LoginButton = ({data, setData} : {
  data: webDataType;
  setData: React.Dispatch < React.SetStateAction<webDataType> >;
}) => {
  const hist = useHistory();
  const retButton: JSX.Element = !(data.username !== "" && data.username !== "AnonymousUser")
    ? (<Link className="btn btn-primary m-1 p-1" to="/login" onClick={() => {}}>
      Login
    </Link>)
    : (<div className="d-flex flex-column">
      <button className="btn btn-dark m-1 p-1" onClick={() => {
          const LogoutAttempt = async () => {
            const res = await axios({headers: {}, method: "POST", url: `http://localhost:8000/common/logout/`}).then((res) => res.data);
            return res;
          };
          LogoutAttempt().then((res) => {
            if (res !== "LOGOUT") {
              console.error("ERROR!");
            } else {
              setData({
                ...data,
                username: ""
              });
              hist.push("/");
            }
          });
        }}>
        Logout
      </button>
    </div>);
  return retButton;
};

export default LoginButton;
