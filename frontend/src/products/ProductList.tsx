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
  const [currPage, setCurrPage] = useState(1);
  const [divider, setDivider] = useState(5);
  const [displaying, setDisplaying] = useState<productT[]>([]);

  useEffect(() => {
    async function getProductList() {
      try {
        const result = await axios.get("http://localhost:8000/products/productList/").then((res) => res.data.data);
        setData(result);
        return result;
      } catch (e) {
        console.error(e);
      }
    }
    getProductList().then((res) => {
      setDisplaying(res.slice(0, Math.min(res.length, 5)));
    }).catch((err) => console.error(err));
  }, [checkChange]);
  useEffect(() => {
    setDisplaying(data.slice((currPage - 1) * divider, Math.min(data.length, currPage * divider)));
  }, [divider, currPage, data]);
  useEffect(() => {
    setCurrPage(1);
  }, [divider]);
  const buttonsNum = Math.ceil(data.length / divider);
  const buttonsJSX = [];
  for (let i = 0; i < buttonsNum; i++) 
    buttonsJSX.push(i + 1);
  
  const onChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setDivider(parseInt(e.target.value));
  };

  return (<div className="container min-vw-50 p-3">
    {console.log("rendered")}
    <ul className="list-group" hidden={hidden}>
      {/* {data.map((val) => (<ProductItem key={val.id} checkChange={checkChange} setChange={setChange} productItem={val}/>))} */}
      {displaying.map((val) => (<ProductItem key={val.id} checkChange={checkChange} setChange={setChange} productItem={val}/>))}
    </ul>

    <div className="mx-4 my-2 d-flex flex-column align-items-center justify-content-sm-between">
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={() => {
            if (currPage !== 1) {
              setCurrPage(currPage - 1);
            }
          }}>
          이전
        </button>
        {
          buttonsJSX.map((val) => (<button key={val} className={`btn btn-primary` + (
              currPage === val
              ? ` active disabled`
              : "")} onClick={() => {
              setCurrPage(val);
            }}>
            {val}
          </button>))
        }
        <button type="button" className="btn btn-primary" onClick={() => {
            if (currPage !== buttonsNum) {
              setCurrPage(currPage + 1);
            }
          }}>
          다음
        </button>
      </div>
      <div className="top-25 bg-dark text-light rounded p-1 m-1">
        <label htmlFor="divider" className="form-label">
          How many products in one list?
        </label>
        <select name="divider" className="form-select w-50" onChange={onChange} value={divider}>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  </div>);
};

export default ProductList;
