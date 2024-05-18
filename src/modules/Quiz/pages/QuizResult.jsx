import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const { score, questions, selectedOptions } = location.state || {
    score: 0,
    questions: [],
    selectedOptions: [],
  };

  let employabilityMessage;

  if (score >= 61 && score <= 80) {
    employabilityMessage = <span className="text-green-500">High Employability.</span>;
  } else if (score >= 41 && score <= 60) {
    employabilityMessage = (
      <span className="text-yellow-500">
        Medium employability. Need to focus on gaining and honing skills.
      </span>
    );
  } else if (score >= 0 && score <= 40) {
    employabilityMessage = (
      <span className="text-red-500">
        Below average. Focus on your career. Gain related skills.
      </span>
    );
  } else {
    employabilityMessage = <span className="text-neutral-500">Invalid score.</span>;
  }

  const getAnalysisMessage = (mark) => {
    switch (mark) {
      case 1:
        return <span className="text-[#EF4444]">Lots of room to improve</span>;
      case 2:
        return <span className="text-[#F59E0B]">Some room to improve</span>;
      case 3:
        return <span className="text-[#3B82F6]">Doing okay</span>;
      case 4:
        return <span className="text-[#10B981]">Doing great</span>;
      default:
        return <span className="text-[#6B7280]">No analysis available</span>;
    }
  };

  // Debugging log
  //   console.log('QuizResult - score:', score);
  //   console.log('QuizResult - questions:', JSON.stringify(questions, null, 2));
  //   console.log('QuizResult - selectedOptions:', JSON.stringify(selectedOptions, null, 2));

  return (
    <div className="w-full max-h-screen p-6 overflow-y-auto">
      <div className="w-full p-4 font-semibold text-center rounded-lg bg-primary bg-opacity-10">
        <h1 className="text-3xl text-primary ">Quiz Result</h1>
        <p className="my-4 text-xl">Your Total Score: {score}</p>
        <p className="text-lg">{employabilityMessage}</p>
      </div>
      <div className="w-full mt-12">
        <h2 className="text-2xl font-semibold">Question Analysis</h2>
        <div className="grid gap-5 mt-4">
          {questions?.map((question, index) => {
            // Get the selected option for the current question
            const selectedOption = selectedOptions[index];

            // Find the selected option object from the question options array
            const selectedOptionObject = question.options.find((opt) => opt._id === selectedOption);

            return (
              <div
                key={question._id}
                className="p-4 leading-8 text-left border rounded-lg border-neutral-200"
              >
                <p className="font-semibold">{question.question}</p>
                <div>
                  {selectedOptionObject ? (
                    <>
                      <p className="flex flex-wrap items-center gap-2">
                        <span>
                          <span className="uppercase ">{selectedOptionObject.label})</span>{' '}
                          {selectedOptionObject.option}
                        </span>

                        <span>-</span>
                        <span className="font-medium">
                          {getAnalysisMessage(selectedOptionObject.mark)}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Marking Criteria: </span>
                        {question.markingCriteria}
                      </p>
                    </>
                  ) : (
                    'No answer selected'
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
