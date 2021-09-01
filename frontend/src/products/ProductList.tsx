import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {MCP} from "../types/types";
import ProductItem from "./ProductItem";
import {productListContent} from "../types/types";
import serverRequest from "../modules/ServerRelated";
import {sortingFilter} from "../modules/ArrayRelated";

const ProductList = ({mcp} : {
  mcp: MCP
}) => {
  const [contents, setContents] = useState<productListContent>({currPage: 1, divider: 5, filters: "added_date", displaying: [], data: []});
  const {currPage, divider, data, filters, displaying} = contents;

  useEffect(() => {
    serverRequest({url: "http://localhost:8000/products/productList/", method: "GET"}).then((res) => {
      setContents((contents) => ({
        ...contents,
        data: res.data,
        displaying: res.data.slice(0, Math.min(res.length, 5))
      }));
    });
  }, [mcp.changing]);
  useEffect(() => {
    setContents((contents) => ({
      ...contents,
      displaying: data.slice((currPage - 1) * divider, Math.min(data.length, currPage * divider))
    }));
  }, [currPage, divider, data]);
  useEffect(() => {
    setContents((contents) => ({
      ...contents,
      data: data.sort(sortingFilter(filters)),
      displaying: data.slice(0, Math.min(data.length, divider)),
      currPage: 1
    }));
  }, [divider, filters, data]);
  const buttonsNum = Math.ceil(data.length / divider);
  const buttonsJSX = [];
  for (let i = 0; i < buttonsNum; i++) 
    buttonsJSX.push(i + 1);
  
  const onChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setContents({
      ...contents,
      [e.target.name]: typeof e.target.value === "number"
        ? parseInt(e.target.value)
        : e.target.value
    });
  };

  return (<div>
    <div className="bg-dark text-light rounded p-3 my-2">
      <div className="d-flex flex-row">
        <div className="bg-secondary flex-fill p-1 m-1 rounded">
          <label htmlFor="divider" className="form-label">
            Products per page
          </label>
          <select name="divider" className="form-select w-50" onChange={onChange} value={divider}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="bg-secondary flex-fill p-1 m-1 rounded">
          <label htmlFor="filters" className="form-label">
            Sort by...
          </label>
          <select name="filters" className="form-select w-50" onChange={onChange} value={filters}>
            <option value={"added_date"}>추가 일시</option>
            <option value={"modded_date"}>수정 일시</option>
            <option value={"upvote"}>좋아요 순</option>
            <option value={"downvote"}>싫어요 순</option>
          </select>
        </div>
      </div>
    </div>
    <ul className="list-group">
      {displaying.map((val) => (<ProductItem key={val.id} productItem={val} mcp={mcp}/>))}
    </ul>

    <div className="m-2 d-flex flex-column align-items-center justify-content-sm-between">
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={() => {
            if (currPage !== 1) {
              setContents({
                ...contents,
                currPage: currPage - 1
              });
            }
          }}>
          이전
        </button>
        {
          buttonsJSX.map((val) => (<button key={val} className={`btn btn-primary` + (
              currPage === val
              ? ` active disabled`
              : "")} onClick={() => {
              setContents({
                ...contents,
                currPage: val
              });
            }}>
            {val}
          </button>))
        }
        <button type="button" className="btn btn-primary" onClick={() => {
            if (currPage !== buttonsNum) {
              setContents({
                ...contents,
                currPage: currPage + 1
              });
            }
          }}>
          다음
        </button>
      </div>
    </div>
  </div>);
};

export default ProductList;
