import axios, {Method} from "axios";

type serverData = {
  method: Method;
  url: string;
  headers?: any;
  formData?: FormData;
};

const serverRequest = async ({url, method, formData, headers} : serverData) => {
  if (headers) {
    const res = await axios({
      method: method,
      url: url,
      data: formData
        ? formData
        : {},
      headers: headers
    }).then((res) => res.data).catch((err) => {
      console.error(err);
    });
    return res;
  } else {
    const res = await axios({
      method: method,
      url: url,
      data: formData
        ? formData
        : {}
    }).then((res) => res.data).catch((err) => {
      console.error(err);
    });
    return res;
  }
};

export default serverRequest;
