import React from "react";
import {MCP} from "../types/types";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const ProductPage = ({mcp} : {
  mcp: MCP
}) => {
  return (<div className="container">
    <ProductList mcp={mcp}/>

    <div className="container border border-info rounded position-relative p-3 m-1 mx-3">
      <div className="position-absolute bg-white fw-bold" style={{
          top: -13
        }}>
        Submit your product!
      </div>
      <ProductForm mcp={mcp}/>
    </div>
  </div>);
};

export default ProductPage;
