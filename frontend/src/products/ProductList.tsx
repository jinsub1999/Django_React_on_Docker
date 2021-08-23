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
  return (<div className="container min-vw-50 p-3">
    <ul className="list-group">
      {
        data.map((val) => {
          const add_Date = new Date(val.added_date);
          return (<li key={val.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{val.name}</div>
              <div>
                추가일 : {add_Date.getFullYear()}년 {add_Date.getMonth()}월{" "}
                {add_Date.getDay()}일
              </div>
              <div className="text-truncate" style={{
                  width: 250,
                  maxWidth: "100%"
                }}>
                {val.description}
              </div>
            </div>
            <a style={{
                position: "absolute",
                right: 10,
                bottom: 10
              }} className="btn btn-primary" href="#">
              이동
            </a>
            <span className="badge bg-secondary">가격 : {val.price}원</span>
          </li>);
        })
      }
    </ul>
  </div>);
};

export default ProductList;
