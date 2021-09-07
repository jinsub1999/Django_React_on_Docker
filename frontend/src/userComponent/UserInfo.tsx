import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {sortingFilter} from "../modules/ArrayRelated";
import {dateStringKor} from "../modules/DateRelated";
import serverRequest from "../modules/ServerRelated";
import {productT, webDataType} from "../types/types";

const UserNavInfo = ({data, setData} : {
  data: webDataType;
  setData: React.Dispatch < React.SetStateAction<webDataType> >;
}) => {
  return (<Link to="/user" className="btn bg-light justify-content-center border align-items-center border-dark rounded m-1 p-1 d-flex fw-bold">
    <div className="d-none d-sm-block">
      <img alt="" src={`http://localhost:8000/common/profile/?${data.username}=${
        data.userChanges
          ? 1
          : 0}`} height={100} width={100} className="p-1 m-1"/>
    </div>
    {data.username}
  </Link>);
};
const UserInfo = ({data, setData} : {
  data: webDataType;
  setData: React.Dispatch < React.SetStateAction<webDataType> >;
}) => {
  const hist = useHistory();
  const [img, setImg] = useState < File | undefined > (undefined);
  const [preview, setPreview] = useState < string | undefined > ();
  const [upvotedProduct, setUpvoted] = useState<productT[]>([]);
  const [downvotedProduct, setDownvoted] = useState<productT[]>([]);
  useEffect(() => {
    serverRequest({url: "http://localhost:8000/common/uservote", method: "GET"}).then((res) => {
      setUpvoted(res.userUpvotes);
      setDownvoted(res.userDownvotes);
    });
  }, []);
  const onImgChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") 
          setPreview(e.target.result);
        };
      reader.readAsDataURL(file);
    }
    if (e.target.files) 
      setImg(e.target.files[0]);
    };
  return (<div className="border border-dark m-3 p-1">
    <div className="p-3">
      <div className="d-flex justify-content-center bg-secondary bg-gradient">
        {preview && <img src={preview} alt="" height={200} width={200}/>}
      </div>
      <div className="form-group align-items-center my-2">
        <label htmlFor="imagefile" className="form-label">
          Change Profile image (200 * 200) {preview && `(Preview)`}
        </label>
        <input className="form-control" type="file" formEncType="multipart/form-data" name="imagefile" onChange={onImgChange} accept="image/*"/>
      </div>

      <button className={"btn btn-primary" + (
          img
          ? ""
          : ` disabled`)} onClick={() => {
          if (img) {
            const reqq = new FormData();
            reqq.set("profile_img", img);
            serverRequest({method: "POST", url: "http://localhost:8000/common/profile/", formData: reqq}).then((res) => {
              if (res === "OK") {
                alert("Your Image has been uploaded successfully.");
                setData({
                  ...data,
                  userChanges: !data.userChanges
                });
                hist.push("/");
              } else {
                alert("There was a problem uploading your image.");
              }
            });
          }
        }}>
        Upload Image
      </button>
    </div>

    <div className="container border border-success my-3">
      <h4 className="my-2">좋아한 물품</h4>
      <table className="table">
        <thead>
          <tr>
            <th>제품 이름</th>
            <th>제품 가격</th>
            <th>제품 추가일시</th>
            <th>제품 수정일시</th>
            <th>
              <i className={`bi bi-hand-thumbs-up`}></i>
            </th>
            <th>
              <i className={`bi bi-hand-thumbs-down`}></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            upvotedProduct.sort(sortingFilter("upvote")).map((val) => {
              return (<tr key={val.id}>
                <td>
                  <Link className="link-success" to={`/products/${val.id}`}>
                    {val.name}
                  </Link>
                </td>
                <td>{val.price}</td>
                <td>
                  {
                    dateStringKor({
                      date: new Date(val.added_date),
                      strformat: "YMDh"
                    })
                  }
                </td>
                <td>
                  {
                    val.modded_date && dateStringKor({
                      date: new Date(val.modded_date),
                      strformat: "YMDh"
                    })
                  }
                </td>
                <td>{val.upvotes}</td>
                <td>{val.downvotes}</td>
              </tr>);
            })
          }
        </tbody>
      </table>
    </div>
    <div className="container border border-danger my-3">
      <h4 className="my-2">싫어한 물품</h4>

      <table className="table">
        <thead>
          <tr>
            <th>제품 이름</th>
            <th>제품 가격</th>
            <th>제품 추가일시</th>
            <th>제품 수정일시</th>
            <th>
              <i className={`bi bi-hand-thumbs-up`}></i>
            </th>
            <th>
              <i className={`bi bi-hand-thumbs-down`}></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            downvotedProduct.sort(sortingFilter("downvote")).map((val) => {
              return (<tr key={val.id}>
                <td>
                  <Link className="link-danger" to={`/products/${val.id}`}>
                    {val.name}
                  </Link>
                </td>
                <td>{val.price}</td>
                <td>
                  {
                    dateStringKor({
                      date: new Date(val.added_date),
                      strformat: "YMDh"
                    })
                  }
                </td>
                <td>
                  {
                    val.modded_date && dateStringKor({
                      date: new Date(val.modded_date),
                      strformat: "YMDh"
                    })
                  }
                </td>
                <td>{val.upvotes}</td>
                <td>{val.downvotes}</td>
              </tr>);
            })
          }
        </tbody>
      </table>
    </div>
  </div>);
};
export default UserInfo;

export {
  UserNavInfo
};
