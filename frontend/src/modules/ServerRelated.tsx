import axios, {Method} from "axios";

type serverData = {
  method: Method;
  url: string;
  formData?: FormData;
};

/**
 * return (res.data).
 */
const serverRequest = async ({url, method, formData} : serverData) => {
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
};

export default serverRequest;
