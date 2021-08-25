import React from "react";
import {useState} from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import {webDataType} from "../types/types";

const ProductPage = ({data} : {
  data: webDataType
}) => {
  const {token} = data;
  const [check, setCheck] = useState(false);
  const [checkChange, setCheckChange] = useState(false);

  return (<div>
    <div>
      <ProductForm token={token} setChange={setCheckChange}/>
    </div>
    <button className="btn btn-secondary mx-3" onClick={() => {
        setCheck(!check);
      }}>
      ProductList
    </button>
    {check && (<ProductList token={token} setChange={setCheckChange} checkChange={checkChange}/>)}
  </div>);
};

export default ProductPage;
