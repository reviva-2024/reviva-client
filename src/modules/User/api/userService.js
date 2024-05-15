
import { noAuthURL } from "../../../api/intances";
import { Style, logs } from "../../../utils/logs";
import { trycatch } from "../../../utils/trycatch";


export const loginApi = async (data) => {
  logs("API Call: loginApi", [], Style.api);
  logs("Data: loginApi", [data], Style.code);

  const [loginRes, loginErr] = await trycatch(noAuthURL().post("/user/login", data));

  if (loginErr) {
    logs("Error: loginApi", [loginErr.response], Style.danger);
    return loginErr.response;
  }

  logs("Success: loginApi", [loginRes], Style.success);

  return loginRes;
};
export const registrationApi = async (data) => {
  logs("API Call: registrationApi", [], Style.api);
  logs("Data: registrationApi", [data], Style.code);

  const [registrationRes, registrationErr] = await trycatch(noAuthURL().post("/user/register", data));

  if (registrationErr) {
    logs("Error: registrationApi", [registrationErr.response], Style.danger);
    return registrationErr.response;
  }

  logs("Success: registrationApi", [registrationRes], Style.success);

  return registrationRes;
};