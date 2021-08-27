import React from "react";
import {useLocation} from "react-router-dom";
import {errkind, FormError} from "../types/types";
const errDict: errkind = {
  nameERR: "제품 이름",
  priceERR: "제품 가격",
  descriptionERR: "제품 설명",
  usernameERR: "사용자 아이디",
  passwordERR: "사용자 암호",
  usernotfoundERR: "존재하지 않는 사용자",
  usernameSIGNUPERR: "회원가입 아이디",
  password1SIGNUPERR: "회원가입 암호",
  password2SIGNUPERR: "회원가입 암호"
};

const ErrorMsg = () => {
  const paramsURL = useLocation().search;
  //   const paramsURL = useLocation().search;
  const params = new URLSearchParams(paramsURL);
  const errs: FormError[] = [];

  params.forEach((val : string, key : string) => {
    errs.push({errName: errDict[key], errDescription: val});
  });
  const count = errs.filter((value) => {
    return value.errName;
  });
  return (<div hidden={count.length === 0} className="alert alert-danger" role="alert">
    {
      errs.map((val) => {
        if (val.errName) 
          return (<div key={val.errName}>
            {val.errName}: {val.errDescription}
          </div>);
        else 
          return "";
        }
      )
    }
  </div>);
};
const ErrorListMsg = ({errs} : {
  errs: FormError[]
}) => {
  errs = errs.map((val) => {
    return {
      ...val,
      errName: errDict[`${val.errName}`]
    };
  });
  const count = errs.filter((value) => {
    return value.errName;
  });
  return (<div hidden={count.length === 0} className="alert alert-danger" role="alert">
    {
      errs.map((val, idx) => {
        if (val.errName) 
          return (<div key={val.errName + `_${idx}`}>
            {val.errName}: {val.errDescription}
          </div>);
        else 
          return "";
        }
      )
    }
  </div>);
};
export default ErrorMsg;
export {
  ErrorListMsg
};
