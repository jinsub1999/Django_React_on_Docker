import axios from "axios";
import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {productT} from "../types/types";

const ProductDetail = () => {
  const [data, setData] = useState<productT>({id: -1, name: "", price: -1, description: "", added_date: "0"});
  const [err, setErr] = useState<Boolean>(false);
  const {id} : {
    id: string;
  } = useParams();
  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/products/${id}`).then((res) => res.data).catch();
        setData(res.data);
      } catch (e) {
        console.error(e);
        setErr(true);
      }
    };

    getProductData();
  }, [id]);

  return (<div className="container m-2">
    {
      err
        ? (<div>ERR</div>)
        : (<ul className="list-group">
          <li className="list-group-item active">{data.name}</li>
          <li className="list-group-item">
            {new Date(data.added_date).toDateString()}
          </li>
          <li className="list-group-item">{data.price}</li>
          <li className="list-group-item disabled">
            <p>{data.description}</p>
          </li>
        </ul>)
    }
  </div>);
};
export default ProductDetail;
