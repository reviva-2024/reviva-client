import { useEffect, useState } from 'react';
import { useAuth } from '../../User/context/AuthContext';
import { getAllCourse } from '../api/courseApi';
import { Style, logs } from '../../../utils/logs';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const Courses = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [courses, setAllCourses] = useState([]);
  //   Get all the courses And Store to courses state
  useEffect(() => {
    setLoading(true);
    const fetchQuizes = async () => {
      const response = await getAllCourse(user.token);
      logs('getAllQuizes useEffect:', [response], Style.course);

      if (response.data.success) {
        setAllCourses(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    };
    fetchQuizes();
  }, [user.token]);
  //  Render Course Detail based On courses
  if (loading) {
    return (
      <section className="bg-neutral-100 rounded-xl h-60 mt-4 animate-pulse">
        <div className="flex p-4">
          <div className="h-52 items-center w-52 rounded-md animate-pulse bg-neutral-200"></div>
          <div className="pl-4 w-9/12">
            <h1 className="text-xl font-medium"></h1>
            <p className="text-balance"></p>
          </div>
          <button className="bg-neutral-200 animate-pulse px-12 py-6 mt-auto text-white rounded-md ml-auto"></button>
        </div>
      </section>
    );
  }
  const CourseDetail = (course) => {
    return (
      <>
        <div className="flex p-4">
          <div className="h-52 items-center w-52 rounded-md bg-neutral-200"></div>
          <div className="pl-4 w-9/12">
            <h1 className="text-xl font-medium">{course?.course}</h1>
            <p className="text-balance">{course?.description}</p>
          </div>
          <Link
            to={'/courseLesson'}
            state={{ lessons: course.lessons, courseTitle: course.course }}
            className="bg-primary px-8 py-3 mt-auto text-white rounded-md ml-auto"
          >
            View
          </Link>
        </div>
      </>
    );
  };
  return (
    <div>
      {courses?.map((course, index) => (
        <div className="bg-neutral-100/70 rounded-xl h-60 mt-4" key={index}>
          {CourseDetail(course)}
        </div>
      ))}
    </div>
  );
};

export default Courses;
