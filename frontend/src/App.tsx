import React from "react";
import axios from "axios";
import ProductForm from "./products/ProductForm";
import ProductList from "./products/ProductList";
import {useState} from "react";
import Navbar from "./NavBar";
import {Route} from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  const [check, setCheck] = useState(false);
  return (<div className="App">
    <Navbar/>

    <Route exact={true} path="/">
      <div className="p-3">
        <ul className="list-group">
          <li className="list-group-item">
            Welcome! Tap "products" on Navbar to enter your product into our store.
          </li>
        </ul>
      </div>
    </Route>
    <Route path="/products">
      <div>
        <ProductForm/>
      </div>
      <button className="btn btn-secondary mx-3" onClick={() => {
          setCheck(!check);
        }}>
        ProductList
      </button>
      {check && <ProductList/>}
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
