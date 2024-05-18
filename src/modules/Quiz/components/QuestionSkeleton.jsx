import React from 'react';

const QuestionSkeleton = () => {
  return (
    <div className="w-full bg-[#FEF7E7] rounded-lg animate-pulse h-[268px]">
      <div className="h-12 mb-4 rounded-t-lg bg-secondary" />
    </div>
  );
};

export default QuestionSkeleton;
