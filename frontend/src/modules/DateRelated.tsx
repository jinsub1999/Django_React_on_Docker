import {DateParams} from "../types/types";

export const dateStringKor = (dp : DateParams) => {
  let ret = "";

  ret += dp.Y
    ? `${dp.date.getFullYear()}년 `
    : "";
  ret += dp.M
    ? `${dp.date.getMonth()}월 `
    : "";
  ret += dp.D
    ? `${dp.date.getDay()}일 `
    : "";
  ret += dp.h
    ? `${dp.date.getHours()}시 `
    : "";
  ret += dp.m
    ? `${dp.date.getMinutes()}분 `
    : "";
  ret += dp.s
    ? `${dp.date.getSeconds()}초 `
    : "";
  if (ret.endsWith(" ")) 
    return ret.slice(0, ret.length - 1);
  else 
    return ret;
  }
;
