import React from "react";
import {useLocation} from "react-router-dom";

type errkind = {
  [index: string]: string;
  nameERR: string;
  descriptionERR: string;
  priceERR: string;
  usernameERR: string;
  passwordERR: string;
  usernotfoundERR: string;
  usernameSIGNUPERR: string;
  password1SIGNUPERR: string;
  password2SIGNUPERR: string;
};

type FormError = {
  errName: string | null;
  errDescription: string | null;
};

const ErrorMsg = () => {
  const paramsURL = useLocation().search;
  //   const paramsURL = useLocation().search;
  const params = new URLSearchParams(paramsURL);
  const errs: FormError[] = [];
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

  params.forEach((val : string, key : string) => {
    errs.push({errName: errDict[key], errDescription: val});
  });
  const count = errs.filter((value) => {
    return value.errName;
  });
  //   if (params.get("nameERR")) {
  //     errs.push({errName: "제품 이름", errDescription: params.get("nameERR")});
  //   }
  //   if (params.get("priceERR")) {
  //     errs.push({errName: "가격", errDescription: params.get("priceERR")});
  //   }
  //   if (params.get("descriptionERR")) {
  //     errs.push({errName: "설명", errDescription: params.get("descriptionERR")});
  //   }
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

export default ErrorMsg;
