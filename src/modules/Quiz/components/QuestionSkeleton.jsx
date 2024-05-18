import React from 'react';

const QuestionSkeleton = () => {
  return (
    <div className="w-full bg-[#FEF7E7] rounded-lg animate-pulse h-72">
      <div className="px-4 py-2 mb-4 rounded-t-lg bg-secondary">
        <div className="w-1/12 h-4 mb-1 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default QuestionSkeleton;
