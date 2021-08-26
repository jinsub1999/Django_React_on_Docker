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

  return (<div className="container">
    <div>
      <ProductForm token={token} setChange={setCheckChange}/>
    </div>
    <button className="btn btn-secondary mx-3" onClick={() => {
        setCheck(!check);
      }}>
      ProductList
    </button>
    {check && (<ProductList token={token} setChange={setCheckChange} checkChange={checkChange}/>)}
    {/* <button type="button" className="btn btn-primary" id="liveToastBtn">
      Show live toast
    </button> */
    }

    {/* <div className="position-fixed bottom-0 end-0 p-3" style={{
        zIndex: 11
      }}>
      <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <img src="..." className="rounded me-2" alt="..."/>
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>
    </div> */
    }
  </div>);
};

export default ProductPage;
