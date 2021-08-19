import React from "react";
import axios from "axios";
import ProductForm from "./products/ProductForm";
import {NavClock} from "./Clock";
import ProductList from "./products/ProductList";
import {useState} from "react";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  const [check, setCheck] = useState(false);
  return (<div className="App">
    <NavClock/>
    <div>
      <ProductForm/>
    </div>
    <button className="btn btn-secondary mx-3" onClick={() => {
        setCheck(!check);
      }}>
      ProductList
    </button>
    {check && <ProductList/>}
  </div>);
}

export default App;
