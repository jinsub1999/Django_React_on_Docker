import React from "react";
import {useState} from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ProductPage = () => {
  const [hidden, setHidden] = useState(false);
  const [checkChange, setCheckChange] = useState(false);

  return (<div className="container">
    <div>
      <ProductForm checkChange={checkChange} setChange={setCheckChange}/>
    </div>
    <button className="btn btn-secondary mx-3" onClick={() => {
        setHidden(!hidden);
      }}>
      ProductList
    </button>
    <ProductList setChange={setCheckChange} checkChange={checkChange} hidden={hidden}/>
  </div>);
};

export default ProductPage;
