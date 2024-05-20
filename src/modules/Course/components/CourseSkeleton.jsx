import React from 'react';

const CourseSkeleton = () => {
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
};

export default CourseSkeleton;
