import React from "react";

type webDataType = {
  username: string;
  token: string;
};
type FormError = {
  errName: string | null;
  errDescription: string | null;
};
type errkind = {
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
};

export {
  webDataType,
  errkind,
  FormError
};
