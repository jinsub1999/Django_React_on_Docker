import axios, {Method} from "axios";

type serverData = {
  formData?: FormData;
  method: Method;
  url: string;
};

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
