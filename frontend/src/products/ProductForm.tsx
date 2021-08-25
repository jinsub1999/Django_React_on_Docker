import axios from "axios";
import React, {useState} from "react";
import CSRFinput from "../CSRFInput";
import ErrorMsg from "../ErrorMsg";

const ProductForm = ({token, setChange} : {
  token: string;
  setChange: React.Dispatch < React.SetStateAction<boolean> >;
}) => {
  const [data, setData] = useState({name: "", price: 0, description: ""});
  const ChangeData = (e : |React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    console.log(data);
  };

  return (<div className="m-3">
    <ErrorMsg/>
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

    {/* <div className="form-group m-3 d-flex flex-row-reverse">
      <button type="submit" className="btn btn-primary" onClick={() => {}}>
        SUBMIT
      </button>
    </div> */
    }

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
            if (res == "NOT OK") {
              console.error("NOT OK");
            } else {
              setChange((c) => !c);
              setData({name: "", price: 0, description: ""});
            }
          });
        }}>
        등록하기
      </button>
    </div>
  </div>);
};
export default ProductForm;
