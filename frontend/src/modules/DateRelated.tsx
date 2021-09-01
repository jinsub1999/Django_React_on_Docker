import {DateParams} from "../types/types";

export const dateStringKor = (dp : DateParams) => {
  let ret = "";
  const formats = [
    "Y",
    "M",
    "D",
    "h",
    "m",
    "s"
  ];
  const formatStr = [
    `${dp.date.getFullYear()}년 `, `${dp.date.getMonth() + 1}월 `,
    `${dp.date.getDate()}일 `,
    `${dp.date.getHours()}시 `,
    `${dp.date.getMinutes()}분 `,
    `${dp.date.getSeconds()}초 `
  ];
  formats.forEach((val, idx) => {
    if (dp.strformat.includes(val)) 
      ret += formatStr[idx];
    }
  );
  if (ret.endsWith(" ")) 
    return ret.slice(0, ret.length - 1);
  else 
    return ret;
  }
;
