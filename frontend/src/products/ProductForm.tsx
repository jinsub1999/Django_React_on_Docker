import axios from "axios";
import React, {useState} from "react";
import {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {ErrorListMsg} from "../modules/ErrorMsg";
import {FormError, MCP, productT} from "../types/types";

const ProductModifyForm = ({checkChange, setChange} : MCP) => {
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
    const getProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/products/${id}`).then((res) => res.data).catch();
        setModProduct(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    getProductData();
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
            const modifyProduct = async () => {
              const reqq = new FormData();
              reqq.set("name", modProduct.name);
              reqq.set("price", `${modProduct.price}`);
              reqq.set("description", modProduct.description);
              const res = await axios({headers: {}, data: reqq, method: "POST", url: `http://localhost:8000/products/modify/${modProduct.id}/`}).then((res) => res.data);
              return res;
            };
            modifyProduct().then((res) => {
              if (res !== "Modified") {
                setErr(res.errs);
              } else {
                setChange((c) => !c);
                setErr([]);
                hist.goBack();
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

const ProductForm = ({checkChange, setChange} : MCP) => {
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
          const addProduct = async () => {
            const reqq = new FormData();
            reqq.set("name", data.name);
            reqq.set("price", `${data.price}`);
            reqq.set("description", data.description);
            const res = await axios({headers: {}, data: reqq, method: "POST", url: `http://localhost:8000/products/`}).then((res) => res.data);
            return res;
          };
          addProduct().then((res) => {
            if (res === "OK") {
              if (setChange !== undefined) 
                setChange((c) => !c);
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
