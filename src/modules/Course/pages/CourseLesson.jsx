import { Undo2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { useRef } from 'react';

const CourseLesson = () => {
  const { state: course } = useLocation();
  const courseRef = useRef(null);

  const goToPreviousPage = () => {
    window.history.go(-1);
  };

  useEffect(() => {
    useScrollToTop(courseRef);
  }, []);

  return (
    <section className="w-full p-4 ms-20" ref={courseRef}>
      <h1 className="flex items-center gap-3 p-3 mb-3 text-xl font-semibold text-white rounded-md bg-primary">
        <button className="px-2 bg-neutral-50/10" onClick={goToPreviousPage} to={'/courseLesson'}>
          <Undo2 />{' '}
        </button>
        {course.courseTitle}
      </h1>
      {course.lessons.map((lesson, index) => (
        <div key={index} className="mt-4 bg-neutral-100/70 rounded-xl h-60">
          <div className="flex p-4">
            <div className="items-center rounded-md h-52 w-52 bg-neutral-200"></div>
            <div className="w-9/12 pl-4">
              <h1 className="text-xl font-medium">
                Lesson {lesson.lessonNo} : {lesson?.title}
              </h1>
              <p className="pt-1 text-balance">{lesson?.description}</p>
            </div>
            <Link
              to={'/lessonDetail'}
              state={{
                currentLesson: lesson,
                lessons: course.lessons,
                courseTitle: course.courseTitle,
              }}
              className="px-8 py-3 mt-auto ml-auto text-white rounded-md bg-primary"
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
