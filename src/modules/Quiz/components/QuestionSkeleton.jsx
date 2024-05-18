import React from 'react';

const QuestionSkeleton = () => {
  return (
    <div className="w-full bg-neutral-100 rounded-lg animate-pulse h-[268px]">
      <div className="h-12 mb-4 rounded-t-lg bg-neutral-200" />
    </div>
  );
};

export default QuestionSkeleton;
