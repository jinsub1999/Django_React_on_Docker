import React, {useState} from "react";
import CSRFinput from "../CSRFInput";
import ErrorMsg from "../ErrorMsg";

const ProductForm = () => {
  const [data, setData] = useState({name: "", price: undefined, content: ""});
  const [errorMsg, setErrorMsg] = useState("");
  const ChangeData = (e : React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (<form method="POST" action="http://localhost:8000/products/" className="m-3">
    <CSRFinput/>

    <ErrorMsg/>
    <div className="form-group m-3">
      <label htmlFor="name">Product name</label>
      <div className="col-sm-10">
        <input id="name" name="name" value={data.name} onChange={ChangeData} placeholder="Find Product" className="form-control"/>
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
        <textarea id="description" name="description" cols={30} rows={5} className="form-control"></textarea>
      </div>
    </div>

    <div className="form-group m-3 d-flex flex-row-reverse ">
      <button type="submit" className="btn btn-primary">
        POST
      </button>
    </div>
  </form>);
};

export default ProductForm;
