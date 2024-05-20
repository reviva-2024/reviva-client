import { Undo2 } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ScrollToTop from '../../../hooks/useScroollToTop';

const CourseLesson = () => {
  const { state: course } = useLocation();
  ScrollToTop();
  const goToPreviousPage = () => {
    window.history.go(-1);
  };
  return (
    <section className="w-full p-4">
      <h1 className="text-xl flex gap-3 items-center text-white bg-primary p-3 mb-3 rounded-md font-semibold">
        <button className="bg-neutral-50/10 px-2" onClick={goToPreviousPage} to={'/courseLesson'}>
          <Undo2 />{' '}
        </button>
        {course.courseTitle}
      </h1>
      {course.lessons.map((lesson, index) => (
        <div key={index} className="bg-neutral-100/70 rounded-xl h-60 mt-4">
          <div className="flex p-4">
            <div className="h-52 items-center w-52 rounded-md bg-neutral-200"></div>
            <div className="pl-4 w-9/12">
              <h1 className="text-xl font-medium">
                Lesson {lesson.lessonNo} : {lesson?.title}
              </h1>
              <p className="text-balance pt-1">{lesson?.description}</p>
            </div>
            <Link
              to={'/lessonDetail'}
              state={{
                currentLesson: lesson,
                lessons: course.lessons,
                courseTitle: course.courseTitle,
              }}
              className="bg-primary px-8 py-3 mt-auto text-white rounded-md ml-auto"
            >
              Begin
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CourseLesson;
