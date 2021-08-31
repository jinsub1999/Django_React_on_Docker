import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {MCP, productT} from "../types/types";
import ProductItem from "./ProductItem";
import {productListContent} from "../types/types";
import serverRequest from "../modules/ServerRelated";

const ProductList = ({mcp} : {
  mcp: MCP
}) => {
  const [contents, setContents] = useState<productListContent>({currPage: 1, divider: 5, filters: "추가 일시", displaying: [], data: []});
  const {currPage, divider, data, filters, displaying} = contents;
  const sorting = (fil : string) => {
    if (fil === "추가 일시") 
      return(a : productT, b : productT) => {
        if (new Date(a.added_date) > new Date(b.added_date)) 
          return -1;
        else 
          return 1;
        }
      ;
    else if (fil === "수정 일시") 
      return(a : productT, b : productT) => {
        if (!a.modded_date && !b.modded_date) 
          return 0;
        else if (!a.modded_date) 
          return 1;
        else if (!b.modded_date) 
          return -1;
        else if (new Date(a.modded_date) > new Date(b.modded_date)) 
          return -1;
        else 
          return 1;
        }
      ;
    else if (fil === "좋아요 순") 
      return(a : productT, b : productT) => {
        if (a.upvotes > b.upvotes) 
          return -1;
        else 
          return 1;
        }
      ;
    else if (fil === "싫어요 순") 
      return(a : productT, b : productT) => {
        if (a.downvotes > b.downvotes) 
          return -1;
        else 
          return 1;
        }
      ;
    else 
      return(a : productT, b : productT) => {
        if (new Date(a.added_date) > new Date(b.added_date)) 
          return 1;
        else 
          return -1;
        }
      ;
    }
  ;
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
      data: data.sort(sorting(filters)),
      displaying: data.slice((currPage - 1) * divider, Math.min(data.length, currPage * divider)),
      currPage: 1
    }));
  }, [divider, filters, data, currPage]);
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

  return (<div className="container min-vw-50 p-3">
    <div className="bg-dark text-light rounded p-3 my-2">
      <div className="bg-secondary p-1 my-1 rounded">
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
      <div className="bg-secondary p-1 my-1 rounded">
        <label htmlFor="filters" className="form-label">
          Sort by...
        </label>
        <select name="filters" className="form-select w-50" onChange={onChange} value={filters}>
          <option value={"추가 일시"}>추가 일시</option>
          <option value={"수정 일시"}>수정 일시</option>
          <option value={"좋아요 순"}>좋아요 순</option>
          <option value={"싫어요 순"}>싫어요 순</option>
        </select>
      </div>
    </div>
    <ul className="list-group">
      {displaying.map((val) => (<ProductItem key={val.id} productItem={val} mcp={mcp}/>))}
    </ul>

    <div className="mx-4 my-2 d-flex flex-column align-items-center justify-content-sm-between">
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
