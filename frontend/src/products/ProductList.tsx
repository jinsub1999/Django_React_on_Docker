import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
type pList = {
  id: number;
  name: string;
  price: number;
  description: string;
  added_date: string;
};

const ProductList = () => {
  const [data, setData] = useState<pList[]>([]);
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
  }, []);
  return (<div>
    <ul>
      {
        data.map((val) => {
          return (<li key={val.id}>
            <strong className="mx-1">{val.name}</strong>
            {new Date(val.added_date).toDateString()}
            {val.price}
            {val.description}
          </li>);
        })
      }
    </ul>
  </div>);
};

export default ProductList;
