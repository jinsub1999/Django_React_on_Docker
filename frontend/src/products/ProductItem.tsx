import axios from "axios";
import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {dateStringKor} from "../modules/DateRelated";
import {MCP, productT} from "../types/types";

const ProductItemButtons = ({checkChange, setChange, productItem} : MCP) => {
  return (<div className="d-flex justify-content-end w-100">
    <Link className="btn btn-primary me-2 btn-sm" to={`/products/${productItem !.id}`}>
      자세히
    </Link>
    <Link className="btn btn-dark ms-1 me-1 btn-sm" to={`/products/modify/${productItem !.id}`}>
      수정
    </Link>
    <button className="btn btn-danger ms-2 btn-sm" onClick={() => {
        const delProduct = async () => {
          const res = await axios({
            headers: {},
            method: "POST",
            url: `http://localhost:8000/products/del/${productItem !.id}/`
          }).then((res) => res.data);
          return res;
        };
        delProduct().then((res) => {
          if (res === "Deleted") {
            setChange((checkChange) => !checkChange);
            console.log("deleted");
          }
        });
      }}>
      삭제
    </button>
  </div>);
};

const ProductItem = ({checkChange, setChange, productItem} : MCP) => {
  const add_Date = new Date(productItem !.added_date);
  const mod_Date = productItem !.modded_date !== undefined
    ? new Date(productItem !.modded_date)
    : undefined;

  return (<li key={productItem !.id} className="list-group-item d-flex justify-content-between align-items-start position-relative">
    <div>
      <div className="ms-2 me-auto">
        <div className="fs-4 fw-bold py-1">{productItem !.name}</div>
        <div className="fs-6 text-black-50">
          추가일시 :{" "}
          {`${add_Date.getFullYear()}.${add_Date.getMonth()}.${add_Date.getDay()} ${add_Date.getHours()}시`}
        </div>
        {
          mod_Date && (<div className="fs-6 text-black-50">
            수정일시 :{" "}
            {`${mod_Date.getFullYear()}.${mod_Date.getMonth()}.${mod_Date.getDay()} ${mod_Date.getHours()}시`}
          </div>)
        }

        <div className="text-truncate" style={{
            width: 250,
            maxWidth: "100%"
          }}>
          {productItem !.description}
        </div>
      </div>
    </div>
    <div>
      <ProductItemButtons setChange={setChange} checkChange={checkChange} productItem={productItem}/>
    </div>
    <span className="position-absolute position-absolute bottom-0 end-0 badge m-2 rounded-pill" style={{
        backgroundColor: "#A6AD85"
      }}>
      가격 : {productItem !.price}원
    </span>
  </li>);
};
const ProductDetail = () => {
  const [data, setData] = useState<productT>({id: -1, name: "", price: -1, description: "", added_date: "0"});
  const [err, setErr] = useState<Boolean>(false);
  const hist = useHistory();
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
  const addDate = new Date(data.added_date);
  const modDate = data.modded_date
    ? new Date(data.modded_date)
    : undefined;
  return (<div className="container m-2">
    {
      err
        ? (<div>ERR</div>)
        : (<div>
          <button className="btn btn-primary" onClick={() => {
              hist.goBack();
            }}>
            뒤로 가기
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>제품명</th>
                <th>제품 가격</th>
                <th>제품 추가일시</th>
                {modDate && <th>제품정보 수정일시</th>}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.name}</td>
                <td>{data.price}</td>
                <td>
                  {dateStringKor({date: addDate, Y: true, M: true, D: true, h: true})}
                </td>
                {
                  modDate && (<td>
                    {dateStringKor({date: modDate, Y: true, M: true, D: true, h: true})}
                  </td>)
                }
              </tr>
            </tbody>
            <td></td>
          </table>

          <div className="bg-secondary rounded p-3">{data.description}</div>
        </div>)
    }
  </div>);
};
export default ProductItem;
export {
  ProductDetail
};
