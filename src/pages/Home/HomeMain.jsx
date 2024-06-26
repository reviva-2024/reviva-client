import React from 'react';
import QuizSection from './components/quizSection';
import CourseSection from './components/CourseSection';

const HomeMain = () => {
  return (
    <div className="w-full h-screen p-6 overflow-y-scroll ms-20">
      <QuizSection />
      <CourseSection />
    </div>
  );
};

export default HomeMain;

