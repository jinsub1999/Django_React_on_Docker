import React from "react";
import {useLocation} from "react-router-dom";

type errkind = {
  [index: string]: string;
  nameERR: string;
  descriptionERR: string;
  priceERR: string;
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
    descriptionERR: "제품 설명"
  };

  params.forEach((val : string, key : string) => {
    errs.push({errName: errDict[key], errDescription: val});
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
  return (<div hidden={errs.length === 0} className="alert alert-danger" role="alert">
    {
      errs.map((val) => {
        return (<div key={val.errName}>
          {val.errName}: {val.errDescription}
        </div>);
      })
    }
  </div>);
};

export default ErrorMsg;
