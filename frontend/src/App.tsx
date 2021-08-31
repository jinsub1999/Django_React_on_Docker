import React from "react";
import axios from "axios";
import {useState} from "react";
import Navbar from "./modules/NavBar";
import {Route} from "react-router-dom";
import ProductPage from "./products/ProductPage";
import LoginForm from "./userComponent/LoginForm";
import {useEffect} from "react";
import SignupForm from "./userComponent/SignupForm";
import {webDataType} from "./types/types";
import {ProductModifyForm} from "./products/ProductForm";
import UserInfo from "./userComponent/UserInfo";
import {ProductDetail} from "./products/ProductItem";

import "bootstrap-icons/font/bootstrap-icons.css";
import serverRequest from "./modules/ServerRelated";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  const [webData, setWebData] = useState<webDataType>({username: "", userChanges: true});
  const [changing, setChanging] = useState<boolean>(true);
  const mcp = {
    changing,
    setChanging
  };
  useEffect(() => {
    serverRequest({url: "http://localhost:8000/common/get_user/", method: "GET"}).then((res) => {
      setWebData((webData) => ({
        ...webData,
        username: res
      }));
    });
  }, [webData.userChanges]);
  return (<div className="App">
    <Navbar data={webData} setData={setWebData}/>
    <Route exact={true} path="/">
      <div className="p-3">
        <ul className="list-group">
          <li className="list-group-item">
            Welcome! Tap "products" on Navbar to enter your product into our store.
          </li>
        </ul>
      </div>
    </Route>
    <Route path="/products" exact={true}>
      <ProductPage mcp={mcp}/>
    </Route>
    <Route path="/products/:id" exact={true}>
      <ProductDetail/>
    </Route>
    <Route path="/products/modify/:id" exact={true}>
      <ProductModifyForm mcp={mcp}/>
    </Route>
    <Route path="/login">
      <LoginForm data={webData} setData={setWebData}/>
    </Route>
    <Route path="/signup">
      <SignupForm data={webData} setData={setWebData}/>
    </Route>
    <Route path="/user" exact={true}>
      <UserInfo data={webData} setData={setWebData}/>
    </Route>
    <Route path="/info">
      <div className="p-3">
        <ul className="list-group">
          <li className="list-group-item">
            Visit
            <a className="link-dark m-1" href="https://github.com/jinsub1999">
              my github page!
            </a>
          </li>
        </ul>
      </div>
    </Route>
  </div>);
}

export default App;
