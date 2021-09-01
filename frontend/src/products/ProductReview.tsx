import React from "react";
import {useState} from "react";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {dateStringKor} from "../modules/DateRelated";
import {ErrorListMsg} from "../modules/ErrorMsg";
import serverRequest from "../modules/ServerRelated";
import VotingButtons, {votableItem} from "../modules/VotingButton";
import {FormError, MCP, productT, reviewContent} from "../types/types";

const Review = ({val, mcp, product_id, usr} : {
  val: reviewContent;
  mcp: MCP;
  product_id: number;
  usr: string;
}) => {
  const [item, setItem] = useState<votableItem>(val);
  return (<li key={val.id} className="list-group-item">
    <div>
      <strong>{val.author_name}</strong>
    </div>
    <div>{val.content}</div>

    <div>
      {
        dateStringKor({
          date: new Date(val.added_date),
          strformat: "YMDh"
        })
      }
    </div>
    <div className="d-flex justify-content-between">
      <VotingButtons item={item} setItem={setItem} checkURL={`http://localhost:8000/products/review/${val.id}/`}/>
      <div>
        {
          usr === val.author_name && (<button onClick={() => {
              serverRequest({url: `http://localhost:8000/products/review/${product_id}/`, method: "DELETE"}).then((res) => {
                if (res === "Deleted") {
                  mcp.setChanging((c) => !c);
                } else {
                  alert("적절한 요청이 아닙니다.");
                }
              });
            }} className="btn btn-danger">
            삭제
          </button>)
        }
      </div>
    </div>
  </li>);
};
const ReviewList = ({product} : {
  product: productT
}) => {
  const hist = useHistory();
  const [reviews, setReviews] = useState<reviewContent[]>([]);
  const [usrname, setUsrname] = useState("");
  const [changing, setChanging] = useState(true);
  const [errs, setErrs] = useState<FormError[]>([]);
  const [reviewForm, setReviewForm] = useState({content: ""});
  const formChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    if (product.id !== -1) 
      serverRequest({url: `http://localhost:8000/products/review/${product.id}/`, method: "GET"}).then((res) => {
        setReviews(res.data);
      });
    
    serverRequest({url: `http://localhost:8000/common/get_user/`, method: "GET"}).then((res) => {
      setUsrname(res);
    });
  }, [product, changing]);

  return (<div>
    <ul className="list-group my-2">
      {
        reviews.map((val) => {
          return (<Review key={val.id} val={val} usr={usrname} mcp={{
              changing,
              setChanging
            }} product_id={product.id}/>);
        })
      }
    </ul>
    <div className="p-2 border border-primary rounded">
      <strong>리뷰 작성</strong>
      <ErrorListMsg errs={errs}/>
      <textarea className="form-control my-2" name="content" value={reviewForm.content} onChange={formChange} rows={5}></textarea>
      <button onClick={() => {
          const reqq = new FormData();
          reqq.append("content", reviewForm.content);
          serverRequest({url: `http://localhost:8000/products/review/${product.id}/`, method: "POST", formData: reqq}).then((res) => {
            if (res === "Login required") {
              alert("로그인이 필요합니다.");
              hist.push("/login");
            } else if (res === "Reviewed") {
              setChanging((c) => !c);
              setReviewForm({content: ""});
              setErrs([]);
            } else if (res === "Already Reviewed") {
              alert("이미 리뷰하신 제품입니다.");
              setReviewForm({content: ""});
            } else {
              console.log(res);
              setErrs(res.errs);
            }
          });
        }} className="btn btn-primary">
        리뷰 제출
      </button>
    </div>
  </div>);
};

export default ReviewList;
