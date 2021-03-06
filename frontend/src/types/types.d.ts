import React from "react";

export type webDataType = {
  username: string;
  userChanges: boolean;
};
export type FormError = {
  errName: string | null;
  errDescription: string | null;
};
export type errkind = {
  [index: string]: string;
  nameERR: "제품 이름";
  priceERR: "제품 가격";
  descriptionERR: "제품 설명";
  usernameERR: "사용자 아이디";
  passwordERR: "사용자 암호";
  usernotfoundERR: "존재하지 않는 사용자";
  usernameSIGNUPERR: "회원가입 아이디";
  password1SIGNUPERR: "회원가입 암호";
  password2SIGNUPERR: "회원가입 암호";
  contentERR: "리뷰 내용";
};

export type productT = {
  id: number;
  name: string;
  price: number;
  description: string;
  added_date: string;
  upvotes: number;
  downvotes: number;
  author_name: string;
  upvoted?: boolean;
  downvoted?: boolean;
  modded_date?: string;
};

type MutableComponentParams = {
  changing: boolean;
  setChanging: React.Dispatch < React.SetStateAction<boolean> >;
};
export type MCP = MutableComponentParams;

export type DateParams = {
  date: Date;
  strformat: string;
};
export type voteValue = {
  up: boolean;
  down: boolean;
};
export type voteInfo = {
  info: voteValue;
  setInfo?: React.Dispatch < React.SetStateAction<vote_up_down> >;
  productItem?: productT;
};

export type productListContent = {
  currPage: number;
  divider: number;
  filters: string;
  displaying: productT[];
  data: productT[];
};

export type reviewContent = {
  id: number;
  content: string;
  added_date: string;
  upvotes: number;
  downvotes: number;
  author_name: string;
  upvoted?: boolean;
  downvoted?: boolean;
  modded_date?: string;
};
