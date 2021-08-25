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
  return (<div>
    <div>
      <ProductForm token={token}/>
    </div>
    <button className="btn btn-secondary mx-3" onClick={() => {
        setCheck(!check);
      }}>
      ProductList
    </button>
    {check && <ProductList token={token}/>}
  </div>);
};

export default ProductPage;
