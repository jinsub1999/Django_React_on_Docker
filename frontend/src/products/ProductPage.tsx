import React from "react";
import {useState} from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ProductPage = () => {
  const [checkChange, setCheckChange] = useState(false);

  return (<div className="container">
    <ProductList setChange={setCheckChange} checkChange={checkChange}/>

    <div className="container border border-info rounded position-relative p-3 m-1 mx-3">
      <div className="position-absolute bg-white fw-bold" style={{
          top: -13
        }}>
        Submit your product!
      </div>
      <ProductForm checkChange={checkChange} setChange={setCheckChange}/>
    </div>
  </div>);
};

export default ProductPage;
