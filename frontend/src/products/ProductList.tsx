import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import CSRFinput from "../CSRFInput";
export type pList = {
  id: number;
  name: string;
  price: number;
  description: string;
  added_date: string;
};

const ProductList = ({token} : {
  token: string
}) => {
  const [data, setData] = useState<pList[]>([]);
  const [checkChange, setCheck] = useState(false);
  const his = useHistory();
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
    <ul className="list-group">
      {
        data.map((val) => {
          const add_Date = new Date(val.added_date);
          return (<li key={val.id} className="list-group-item d-flex justify-content-between align-items-start position-relative">
            <div>
              <div className="ms-2 me-auto">
                <div className="fs-4 fw-bold py-1">{val.name}</div>
                <div className="fs-6 text-black-50">
                  추가일시 : {add_Date.getFullYear()}년 {add_Date.getMonth()}
                  월 {add_Date.getDay()}일 {add_Date.getHours()}시
                </div>
                <div className="text-truncate" style={{
                    width: 250,
                    maxWidth: "100%"
                  }}>
                  {val.description}
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-end w-100">
                <Link className="btn btn-primary me-3" to={`/products/${val.id}`}>
                  이동
                </Link>
                <button className="btn btn-danger" type="submit" onClick={() => {
                    const delProduct = async () => {
                      const res = await axios({
                        headers: {},
                        data: {
                          csrfmiddlewaretoken: token
                        },
                        method: "POST",
                        url: `http://localhost:8000/products/del/${val.id}/`
                      }).then((res) => res.data);
                      return res;
                    };
                    delProduct().then((res) => {
                      if (res === "Deleted") {
                        setCheck((checkChange) => !checkChange);
                        console.log("deleted");
                      }
                    });
                  }}>
                  삭제
                </button>
              </div>
            </div>
            <span className="position-absolute position-absolute bottom-0 end-0 badge m-2 rounded-pill" style={{
                backgroundColor: "#A6AD85"
              }}>
              가격 : {val.price}원
            </span>
          </li>);
        })
      }
    </ul>
  </div>);
};

export default ProductList;
