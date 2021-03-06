import React from "react";
import {Link} from "react-router-dom";
import Clock from "./Clock";
import logo from "../images/logo.svg";
import {webDataType} from "../types/types";
import LoginButton from "../userComponent/LoginButton";
import {UserNavInfo} from "../userComponent/UserInfo";

const Navbar = ({data, setData} : {
  data: webDataType;
  setData: React.Dispatch < React.SetStateAction<webDataType> >;
}) => {
  const {username} = data;
  const auth = username !== "" && username !== "AnonymousUser";
  // const history = useHistory();
  return (<nav className="navbar navbar-light bg-secondary">
    <div className="navbar">
      <Link to="/" className="navbar-brand mx-2">
        <img src={logo} width="30" height="30" className="d-inline-block align-top mx-3 img-thumbnail" alt=""/>
        Homepage
      </Link>
      <div className="navbar mx-2">
        <div className="nav navbar-nav flex-row">
          <li className="mx-2">
            <Link to="/products" className="nav-item nav-link">
              Products
            </Link>
          </li>
          <li className="mx-2">
            <Link to="/info" className="nav-item  nav-link">
              Info
            </Link>
          </li>
        </div>
      </div>
    </div>

    <div className="mx-1 d-md-flex flex-row">
      {
        auth
          ? <UserNavInfo data={data} setData={setData}/>
          : ""
      }
      <div className="d-flex flex-column">
        <Clock/>
        <LoginButton data={data} setData={setData}/>
      </div>
    </div>
  </nav>);
};

export default Navbar;
