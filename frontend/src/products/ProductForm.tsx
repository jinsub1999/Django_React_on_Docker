import React, {useState} from "react";
import {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ErrorListMsg} from "../modules/ErrorMsg";
import serverRequest from "../modules/ServerRelated";
import {FormError, MCP, productT} from "../types/types";

const ProductModifyForm = ({mcp} : {
  mcp: MCP
}) => {
  const [err, setErr] = useState<FormError[]>([]);
  const [modProduct, setModProduct] = useState < productT | undefined > (undefined);
  const hist = useHistory();
  const {id} : {
    id: string;
  } = useParams();
  const ChangeData = (e : |React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setModProduct({
      ...modProduct !,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    serverRequest({url: `http://localhost:8000/products/${id}`, method: "GET"}).then((res) => {
      setModProduct(res.data);
    });
  }, [id]);
  if (modProduct !== undefined) 
    return (<div className="m-3">
      <ErrorListMsg errs={err}/>
      <div className="form-group m-3">
        <label htmlFor="name">Product name</label>
        <div className="col-sm-10">
          <input id="name" name="name" value={modProduct.name} onChange={ChangeData} placeholder="Input your product." className="form-control"/>
        </div>
      </div>

      <div className="form-group m-3">
        <label htmlFor="price">Price</label>
        <div className="col-sm-10">
          <input type="number" id="price" value={modProduct.price} name="price" onChange={ChangeData} className="form-control"/>
        </div>
      </div>

      <div className="form-group m-3">
        <label htmlFor="description">Description</label>
        <div className="col-sm-10">
          <textarea id="description" name="description" value={modProduct.description} cols={30} rows={5} onChange={ChangeData} placeholder="Describe your product." className="form-control"></textarea>
        </div>
      </div>
      <div className="form-group m-3 d-flex flex-row-reverse">
        <button className="btn btn-primary" onClick={() => {
            const reqq = new FormData();
            reqq.set("name", modProduct.name);
            reqq.set("price", `${modProduct.price}`);
            reqq.set("description", modProduct.description);
            serverRequest({method: "POST", url: `http://localhost:8000/products/modify/${modProduct.id}/`, formData: reqq}).then((res) => {
              if (res !== "Modified") {
                setErr(res.errs);
              } else {
                setErr([]);
                mcp.setChanging((c) => !c);
                hist.push("/products");
              }
            });
          }}>
          등록하기
        </button>
      </div>
    </div>);
  else 
    return <div>NOT FOUND</div>;
  }
;

const ProductForm = ({mcp} : {
  mcp: MCP
}) => {
  const [err, setErr] = useState<FormError[]>([]);
  const [data, setData] = useState({name: "", price: 0, description: ""});
  const hist = useHistory();
  const ChangeData = (e : |React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (<div className="m-3">
    <ErrorListMsg errs={err}/>
    <div className="form-group m-3">
      <label htmlFor="name">Product name</label>
      <div className="col-sm-10">
        <input id="name" name="name" value={data.name} onChange={ChangeData} placeholder="Input your product." className="form-control"/>
      </div>
    </div>

    <div className="form-group m-3">
      <label htmlFor="price">Price</label>
      <div className="col-sm-10">
        <input type="number" id="price" value={data.price} name="price" onChange={ChangeData} className="form-control"/>
      </div>
    </div>

    <div className="form-group m-3">
      <label htmlFor="description">Description</label>
      <div className="col-sm-10">
        <textarea id="description" name="description" value={data.description} cols={30} rows={5} onChange={ChangeData} placeholder="Describe your product." className="form-control"></textarea>
      </div>
    </div>
    <div className="form-group m-3 d-flex flex-row-reverse">
      <button className="btn btn-primary" onClick={() => {
          const reqq = new FormData();
          reqq.set("name", data.name);
          reqq.set("price", `${data.price}`);
          reqq.set("description", data.description);
          serverRequest({url: `http://localhost:8000/products/`, method: "POST", formData: reqq}).then((res) => {
            if (res === "OK") {
              mcp.setChanging((c) => !c);
              setData({name: "", price: 0, description: ""});
              setErr([]);
            } else if (res === "Login Required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            } else {
              setErr(res.errs);
            }
          });
        }}>
        등록하기
      </button>
    </div>
  </div>);
};
export default ProductForm;
export {
  ProductModifyForm
};
