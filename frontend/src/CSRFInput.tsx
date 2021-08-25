import React, {useState, useEffect} from "react";
import axios from "axios";
import {Cookies} from "react-cookie";

const CSRFinput = ({token} : {
  token: string
}) => {
  return (<input hidden={true} name="csrfmiddlewaretoken" value={token} readOnly={true}/>);
};

export default CSRFinput;
