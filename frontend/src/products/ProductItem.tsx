import axios from "axios";
import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {dateStringKor} from "../modules/DateRelated";
import serverRequest from "../modules/ServerRelated";
import {MCP, productT, voteInfo, voteValue} from "../types/types";

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

const VotingBtn = ({info, setInfo, productItem} : voteInfo) => {
  const hist = useHistory();
  const [votes, setVotes] = useState({up: 0, down: 0});
  useEffect(() => {
    if (productItem) 
      setVotes({up: productItem.upvotes, down: productItem.downvotes});
    }
  , [productItem]);
  return (<div className="btn-group d-flex my-1">
    <button className="btn btn-success" onClick={() => {
        if (setInfo && productItem) {
          serverRequest({method: "POST", url: `http://localhost:8000/products/vote/${productItem.id}/1/`}).then((res) => {
            if (res === "OK") {
              setVotes({
                up: info.up
                  ? votes.up - 1
                  : votes.up + 1,
                down: info.down
                  ? votes.down - 1
                  : votes.down
              });
              setInfo({
                up: !info.up,
                down: false
              });
            } else if (res === "Login Required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            }
          });
        }
      }}>
      <i className={`bi bi-hand-thumbs-up${info.up
          ? "-fill"
          : ""}`}></i>
      <span className="mx-2">{productItem && votes.up}</span>
    </button>
    <button className="btn btn-danger" onClick={() => {
        if (setInfo && productItem) {
          serverRequest({method: "POST", url: `http://localhost:8000/products/vote/${productItem.id}/2/`}).then((res) => {
            if (res === "OK") {
              setVotes({
                up: info.up
                  ? votes.up - 1
                  : votes.up,
                down: info.down
                  ? votes.down - 1
                  : votes.down + 1
              });
              setInfo({
                up: false,
                down: !info.down
              });
            } else if (res === "Login Required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            }
          });
        }
      }}>
      <i className={`bi bi-hand-thumbs-down${info.down
          ? "-fill"
          : ""}`}></i>
      <span className="mx-2">{productItem && votes.down}</span>
    </button>
  </div>);
};

const ProductItem = ({checkChange, setChange, productItem} : MCP) => {
  const add_Date = new Date(productItem !.added_date);
  const defaultVote: voteValue = {
    up: productItem
      ? productItem.upvoted
      : false,
    down: productItem
      ? productItem.downvoted
      : false
  };
  const [v, setV] = useState<voteValue>(defaultVote);
  const mod_Date = productItem !.modded_date !== undefined
    ? new Date(productItem !.modded_date)
    : undefined;

  return (<li key={productItem !.id} className="list-group-item d-flex justify-content-between align-items-start position-relative">
    <div>
      <div className="ms-2 me-auto">
        <div className="fs-4 fw-bold py-1 d-flex align-items-center">
          {productItem !.name}
          <div className="fs-6 fw-light badge mx-2 p-1 rounded" style={{
              backgroundColor: "#5ABCCB"
            }}>
            {productItem !.author_name}
          </div>
        </div>
        <div className="fs-6 text-black-50">
          추가일시 :{" "}
          {dateStringKor({date: add_Date, Y: true, M: true, D: true, h: true})}
        </div>
        {
          mod_Date && (<div className="fs-6 text-black-50">
            수정일시 :{" "}
            {dateStringKor({date: mod_Date, Y: true, M: true, D: true, h: true})}
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
    <div className="mb-4">
      <ProductItemButtons setChange={setChange} checkChange={checkChange} productItem={productItem}/>
      <VotingBtn info={v} setInfo={setV} productItem={productItem}/>
    </div>
    <span className="position-absolute position-absolute bottom-0 end-0 badge m-2 rounded-pill" style={{
        backgroundColor: "#A6AD85"
      }}>
      가격 : {productItem !.price}원
    </span>
  </li>);
};
const ProductDetail = () => {
  const [data, setData] = useState<productT>({
    id: -1,
    name: "",
    price: -1,
    description: "",
    added_date: "0",
    downvotes: 0,
    upvotes: 0,
    author_name: "",
    upvoted: false,
    downvoted: false
  });
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

          <div className="border border-secondary rounded p-3">
            {data.description}
          </div>
        </div>)
    }
  </div>);
};
export default ProductItem;
export {
  ProductDetail
};
