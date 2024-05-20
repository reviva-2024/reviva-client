import { authURL } from '../../../api/intances';
import { Style, logs } from '../../../utils/logs';
import { trycatch as tryCatch } from '../../../utils/trycatch';

export const getAllCourse = async (token) => {
  logs('API Call: getAllCourses', [], Style.course);

  const [allCourses, allCoursesError] = await tryCatch(authURL(token).get('/course/getAllCourses'));

  if (allCoursesError) {
    logs('Error: getAllCourses', [allCoursesError.response], Style.danger);
    return allCoursesError.response;
  }

  logs('Success: getAllCourses', [allCourses], Style.success);

  return allCourses;
};
