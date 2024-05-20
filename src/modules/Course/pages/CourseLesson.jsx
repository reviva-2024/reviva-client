import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CourseLesson = () => {
  const { state: course } = useLocation();
  return (
    <section className="w-full p-4">
      <h1 className="text-xl text-white bg-primary p-3 rounded-md font-semibold">
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
