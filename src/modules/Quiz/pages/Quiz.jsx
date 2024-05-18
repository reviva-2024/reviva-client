import React, { useEffect, useState } from 'react';
import Question from '../components/Question';
import { getAllQuizesApi } from '../api/quizApi';
import { toast } from 'sonner';
import { useAuth } from '../../User/context/AuthContext';
import { Style, logs } from '../../../utils/logs';
import QuestionSkeleton from '../components/QuestionSkeleton';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(''));
  const [showResult, setShowResult] = useState(false);
  const { user } = useAuth();

  const handleOptionSelect = (index, option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const selectedOption = selectedOptions[index];
      const selectedOptionObject = question.options.find((opt) => opt._id === selectedOption);
      if (selectedOptionObject) {
        score += selectedOptionObject.mark;
      }
    });
    return score;
  };

  useEffect(() => {
    setLoading(true);

    const getAllPurchaseReport = async () => {
      const response = await getAllQuizesApi(user.token);
      logs('getAllQuizes useEffect:', [response], Style.effects);

      if (response.data.success) {
        setQuestions(response.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    };
    getAllPurchaseReport();
  }, []);

  return (
    <div className="grid w-full max-h-screen gap-5 p-5 overflow-y-auto">
      {loading
        ? Array.from({ length: 4 }).map((_, idx) => <QuestionSkeleton key={idx} />)
        : questions.map(({ _id, question, options }, index) => (
            <Question
              key={_id}
              question={question}
              options={options}
              index={index}
              selectedOption={selectedOptions[index]}
              onOptionSelect={(option) => handleOptionSelect(index, option)}
            />
          ))}
      <button onClick={() => setShowResult(!showResult)}>Show Result</button>
      {showResult && <p>Score: {calculateScore()}</p>}
    </div>
  );
};

export default Quiz;
