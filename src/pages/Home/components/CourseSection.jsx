import React from 'react';
import Courses from '../../../modules/Course/components/Course';

const CourseSection = () => {
  return (
    <section className="mt-10">
      <h1 className="text-xl text-white bg-primary p-3 rounded-md font-semibold">All Courses</h1>
      <div>
        <Courses />
      </div>
    </section>
  );
};

export default CourseSection;
