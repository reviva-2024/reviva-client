import { authURL} from "../../../api/intances";
import { Style, logs } from "../../../utils/logs";
import { trycatch } from "../../../utils/trycatch";

export const getAllQuizesApi = async (token) => {
    
  logs("API Call: getAllQuizesApi", [], Style.api);

  const [getAllQuizesRes, getAllQuizesErr] = await trycatch(authURL(token).get("/quiz/getQuizes"));

  if (getAllQuizesErr) {
    logs("Error: getAllQuizesApi", [getAllQuizesErr.response], Style.danger);
    return getAllQuizesErr.response;
  }

  logs("Success: getAllQuizesApi", [getAllQuizesRes], Style.success);

  return getAllQuizesRes;
};


export const getAllBengaliQuizesApi = async (token) => {
    
  logs("API Call: getAllBengaliQuizesApi", [], Style.api);

  const [getAllBengaliQuizesRes, getAllBengaliQuizesErr] = await trycatch(authURL(token).get("/quiz/getBanglaQuizes"));

  if (getAllBengaliQuizesErr) {
    logs("Error: getAllBengaliQuizesApi", [getAllBengaliQuizesErr.response], Style.danger);
    return getAllBengaliQuizesErr.response;
  }

  logs("Success: getAllBengaliQuizesApi", [getAllBengaliQuizesRes], Style.success);

  return getAllBengaliQuizesRes;
};



export const updateQuizeMarkApi = async (token) => {
    
  logs("API Call: updateQuizeMarkApi", [], Style.api);

  const [updateQuizeMarkRes, updateQuizeMarkErr] = await trycatch(authURL(token).put("/user/updateQuizMark"));

  if (updateQuizeMarkErr) {
    logs("Error: updateQuizeMarkApi", [updateQuizeMarkErr.response], Style.danger);
    return updateQuizeMarkErr.response;
  }

  logs("Success: updateQuizeMarkApi", [updateQuizeMarkRes], Style.success);

  return updateQuizeMarkRes;
};