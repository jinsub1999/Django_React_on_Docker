import React from "react";
import {useState} from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ProductPage = ({token} : {
  token: string
}) => {
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
    {check && <ProductList/>}
  </div>);
};

export default ProductPage;
