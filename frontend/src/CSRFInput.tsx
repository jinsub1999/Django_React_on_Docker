import React, {useState, useEffect} from "react";
import axios from "axios";
import {Cookies} from "react-cookie";

const CSRFinput = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    async function GetData() {
      try {
        const res = await axios({method: "GET", url: "http://localhost:8000/products/"}).then(() => {
          const c = new Cookies();
          setToken(c.get("csrftoken"));
        });
      } catch (e) {
        console.error(e);
      }
    }
    GetData();
  }, []);
  return (<input hidden={true} name="csrfmiddlewaretoken" value={token} readOnly={true}/>);
};

export default CSRFinput;
