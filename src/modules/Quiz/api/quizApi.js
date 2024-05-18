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