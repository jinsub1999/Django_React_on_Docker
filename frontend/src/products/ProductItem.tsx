import {useEffect} from "react";
import {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {dateStringKor} from "../modules/DateRelated";
import serverRequest from "../modules/ServerRelated";
import VotingButtons, {votableItem} from "../modules/VotingButton";
import {MCP, productT} from "../types/types";
import Review from "./ProductReview";

const ProductItemButtons = ({productItem, mcp} : {
  mcp: MCP;
  productItem: productT;
}) => {
  const hist = useHistory();
  if (productItem) 
    return (<div className="d-flex justify-content-end w-100">
      <Link className="btn btn-primary btn-sm" to={`/products/${productItem.id}`}>
        자세히
      </Link>
      <button className="btn btn-dark btn-sm d-none d-md-block mx-2" onClick={() => {
          serverRequest({url: `http://localhost:8000/products/modify/${productItem.id}/`, method: "GET"}).then((res) => {
            if (res === "OK") {
              hist.push(`/products/modify/${productItem.id}`);
            } else if (res === "Login required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            } else if (res === "Different user") {
              alert("작성자만 수정할 수 있습니다.");
            }
          });
        }}>
        수정
      </button>
      <button className="btn btn-danger btn-sm d-none d-md-block" onClick={() => {
          serverRequest({url: `http://localhost:8000/products/del/${productItem.id}/`, method: "POST"}).then((res) => {
            if (res === "Deleted") {
              mcp.setChanging((c) => !c);
            } else if (res === "Login required") {
              alert("로그인이 필요한 기능입니다.");
              hist.push("/login");
            } else if (res === "Different user") {
              alert("작성자만 삭제할 수 있습니다.");
            }
          });
        }}>
        삭제
      </button>
    </div>);
  else 
    return <div>Loading...</div>;
  }
;

const ProductItem = ({productItem, mcp} : {
  mcp: MCP;
  productItem: productT;
}) => {
  const [vItem, setVItem] = useState<votableItem>(productItem);
  const add_Date = new Date(productItem.added_date);

  const mod_Date = productItem.modded_date
    ? new Date(productItem.modded_date)
    : undefined;
  return (<li key={productItem.id} className="list-group-item d-flex justify-content-between align-items-start position-relative">
    <div>
      <div className="ms-2 me-auto">
        <div className="fs-4 fw-bold py-1 d-flex align-items-center">
          {productItem.name}
          <div className="fs-6 fw-light badge mx-2 p-1 rounded d-none d-md-block" style={{
              backgroundColor: "#5ABCCB"
            }}>
            {productItem.author_name}
          </div>
        </div>
        <div className="fs-6 text-black-50">
          추가일시 : {dateStringKor({date: add_Date, strformat: "YMDh"})}
        </div>
        {
          mod_Date && (<div className="fs-6 text-black-50">
            수정일시 : {dateStringKor({date: mod_Date, strformat: "YMDh"})}
          </div>)
        }

        <div className="text-truncate" style={{
            width: 250,
            maxWidth: "100%"
          }}>
          {productItem.description}
        </div>
      </div>
    </div>
    <div className="mb-4">
      <ProductItemButtons productItem={productItem} mcp={mcp}/>
      <VotingButtons item={vItem} setItem={setVItem} checkURL={`http://localhost:8000/products/vote/${productItem.id}/`}/>
    </div>
    <span className="position-absolute bottom-0 end-0 badge m-2 rounded-pill" style={{
        backgroundColor: "#A6AD85"
      }}>
      가격 : {productItem.price}원
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
    serverRequest({url: `http://localhost:8000/products/${id}/`, method: "GET"}).then((res) => {
      setData(res.data);
    }).catch((e) => {
      console.error(e);
      setErr(true);
    });
  }, [id]);
  return err
    ? (<div className="container m-2">
      <div>해당 물품을 찾을 수 없습니다.</div>
    </div>)
    : (<div className="container m-2">
      <button className="btn btn-primary" onClick={() => {
          hist.goBack();
        }}>
        뒤로 가기
      </button>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>제품명</th>
              <th>제품 가격</th>
              <th>제품 추가일시</th>
              {data.modded_date && <th>제품 수정일시</th>}
              <th>
                <i className="bi bi-hand-thumbs-up"></i>
              </th>
              <th>
                <i className="bi bi-hand-thumbs-down"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>
                {
                  dateStringKor({
                    date: new Date(data.added_date),
                    strformat: "YMDh"
                  })
                }
              </td>
              {
                data.modded_date && (<td>
                  {
                    dateStringKor({
                      date: new Date(data.modded_date),
                      strformat: "YMDh"
                    })
                  }
                </td>)
              }
              <td>{data.upvotes}</td>
              <td>{data.downvotes}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="border border-secondary rounded p-3">
        {data.description}
      </div>
      <Review product={data}/>
    </div>);
};
export default ProductItem;
export {
  ProductDetail
};
