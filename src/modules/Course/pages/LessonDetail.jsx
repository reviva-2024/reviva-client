import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LessonDetail = () => {
  const { state: lessonDetail } = useLocation();
  const { lessons, courseTitle } = lessonDetail;
  const [currentLesson, setCurrentLesson] = useState(lessonDetail.currentLesson);
  const restLessons = lessons.filter((lesson) => lesson.videoLink != currentLesson.videoLink);
  return (
    <section className="w-full p-4 h-full">
      <h1 className="text-xl text-white bg-primary p-3 mb-3 rounded-md font-semibold">
        Lesson {currentLesson.lessonNo} : {currentLesson.title}
      </h1>
      <div className="w-full rounded-md">
        <iframe
          className="w-full h-[700px]"
          allowFullScreen
          src={currentLesson.videoLink}
          title="W3Schools Free Online Web Tutorials"
        ></iframe>
        <div className="text-xl flex justify-between text-white bg-primary p-3 mb-3 rounded-b-md font-semibold">
          <h1>{courseTitle}</h1>
          <h1>
            {currentLesson.lessonNo}/{lessons.length}
          </h1>
        </div>
      </div>
      <div className="bg-primary-light p-4 rounded-md">
        <h1 className="text-xl font-medium">
          Lesson {currentLesson.lessonNo} : {currentLesson.title}
        </h1>
        <p className="text-balance mt-1 text-medium">{currentLesson.description}</p>
      </div>
      {restLessons.map((lesson, index) => (
        <div
          onClick={() => setCurrentLesson(lesson)}
          key={index}
          className="border-primary cursor-pointer border mt-2 p-4 rounded-md"
        >
          <h1 className="text-xl font-medium">
            Lesson {lesson.lessonNo} : {lesson.title}
          </h1>
          <p className="text-balance mt-1 text-medium">{lesson.description}</p>
        </div>
      ))}
    </section>
  );
};

export default LessonDetail;
