
import { authFileURL, authURL, noAuthURL } from "../../../api/intances";
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

export const sendForgetEmailApi = async (data) => {
  logs("API Call: sendForgotEmailApi", [], Style.api);
  logs("Data: sendForgotEmailApi", [data], Style.code);

  const [sendForgotEmailRes, sendForgotEmailErr] = await trycatch(noAuthURL().put("/user/sendForgotEmail", data));

  if (sendForgotEmailErr) {
    logs("Error: sendForgotEmailApi", [sendForgotEmailErr.response], Style.danger);
    return sendForgotEmailErr.response;
  }

  logs("Success: sendForgotEmailApi", [sendForgotEmailRes], Style.success);

  return sendForgotEmailRes;
};


export const verifyOtpAndForgotPasswordApi = async (data) => {
  logs("API Call: verifyOtpAndForgotPasswordApi", [], Style.api);
  logs("Data: verifyOtpAndForgotPasswordApi", [data], Style.code);

  const [verifyOtpAndForgotPasswordRes, verifyOtpAndForgotPasswordErr] = await trycatch(noAuthURL().put("/user/verifyOtpAndForgotPassword", data));

  if (verifyOtpAndForgotPasswordErr) {
    logs("Error: verifyOtpAndForgotPasswordApi", [verifyOtpAndForgotPasswordErr.response], Style.danger);
    return verifyOtpAndForgotPasswordErr.response;
  }

  logs("Success: verifyOtpAndForgotPasswordApi", [verifyOtpAndForgotPasswordRes], Style.success);

  return verifyOtpAndForgotPasswordRes;
};


export const updateProfileApi = async (data, token) => {
  logs("API Call: updateProfileApi", [], Style.api);  
  logs("Data: updateProfileApi", [data], Style.code);
  
  const [updateProfileRes, updateProfileErr] = await trycatch(authURL(token).put("/user/updateUserInfo", data));

  if (updateProfileErr) {
    logs("Error: updateProfileApi", [updateProfileErr.response], Style.danger);
    return updateProfileErr.response;
  }

  logs("Success: updateProfileApi", [updateProfileRes], Style.success);

  return updateProfileRes;
};

export const changePasswordApi = async (data, token) => {
  logs("API Call: changePasswordApi", [], Style.api);
  logs("Data: changePasswordApi", [data], Style.code);

  const [changePasswordRes, changePasswordErr] = await trycatch(authURL(token).put("/user/verifyOtpAndUpdate", data));

  if (changePasswordErr) {
    logs("Error: changePasswordApi", [changePasswordErr.response], Style.danger);
    return changePasswordErr.response;
  }

  logs("Success: changePasswordApi", [changePasswordRes], Style.success);

  return changePasswordRes;
};

export const profilePictureApi = async (data, token) => {
  logs("API Call: profilePictureApi", [], Style.api);
  logs("Data: profilePictureApi", [data], Style.code);
  
  const [profilePictureRes, profilePictureErr] = await trycatch(authFileURL(token).put("/user/updateProfilePicture", data));

  if (profilePictureErr) {
    logs("Error: profilePictureApi", [profilePictureErr.response], Style.danger);
    return profilePictureErr.response;
  }

  logs("Success: profilePictureApi", [profilePictureRes], Style.success);

  return profilePictureRes;
};
