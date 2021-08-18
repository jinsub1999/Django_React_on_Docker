import React from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import Navbar from "./NavBar";
import {NavClock} from "./Clock";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  return (<div className="App">
    <NavClock/>
    <div>
      <ProductForm/>
    </div>
  </div>);
}

export default App;
