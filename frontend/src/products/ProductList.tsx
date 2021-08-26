import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {productT} from "../types/types";
import ProductItem from "./ProductItem";
import {MCP} from "../types/types";
const ProductList = ({checkChange, setChange, hidden} : {
  hidden: boolean;
} & MCP) => {
  const [data, setData] = useState<productT[]>([]);
  useEffect(() => {
    async function getProductList() {
      try {
        const result = await axios.get("http://localhost:8000/products/productList/").then((res) => res.data.data);
        setData(result);
      } catch (e) {
        console.error(e);
      }
    }
    getProductList();
  }, [checkChange]);
  return (<div className="container min-vw-50 p-3">
    <ul className="list-group" hidden={hidden}>
      {data.map((val) => (<ProductItem key={val.id} checkChange={checkChange} setChange={setChange} productItem={val}/>))}
    </ul>
  </div>);
};

export default ProductList;
