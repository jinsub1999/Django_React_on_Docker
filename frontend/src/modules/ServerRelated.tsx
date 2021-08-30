import axios, {Method} from "axios";

type serverData = {
  formData?: FormData;
  method: Method;
  url: string;
  json?: boolean;
};

const serverRequest = async ({
  url,
  method,
  formData,
  json = true
} : serverData) => {
  if (json) {
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
