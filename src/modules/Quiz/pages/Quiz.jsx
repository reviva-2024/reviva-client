import React, { useEffect, useState } from 'react';
import Question from '../components/Question';
import { getAllQuizesApi } from '../api/quizApi';
import { toast } from 'sonner';
import { useAuth } from '../../User/context/AuthContext';
import { Style, logs } from '../../../utils/logs';
import QuestionSkeleton from '../components/QuestionSkeleton';
import { Button } from '../../../components/buttons/button';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const questionsPerPage = 5;

  useEffect(() => {
    setLoading(true);

    const getAllPurchaseReport = async () => {
      const response = await getAllQuizesApi(user.token);
      logs('getAllQuizes useEffect:', [response], Style.effects);

      if (response.data.success) {
        setQuestions(response.data.data);
        setSelectedOptions(new Array(response.data.data.length).fill(''));
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message);
      }
    };
    getAllPurchaseReport();
  }, [user.token]);

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

  const handleNextPage = () => {
    if (currentPage === Math.ceil(questions.length / questionsPerPage) - 1) {
      navigate('/quiz-result', { state: { score: calculateScore() } });
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const isCurrentPageAnswered = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return selectedOptions.slice(start, end).every((option) => option !== '');
  };

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  return (
    <div className="grid w-full max-h-screen gap-5 p-5 overflow-y-auto">
      {loading
        ? Array.from({ length: 5 }).map((_, idx) => <QuestionSkeleton key={idx} />)
        : currentQuestions.map(({ _id, question, options }, index) => (
            <Question
              key={_id}
              question={question}
              options={options}
              index={startIndex + index}
              selectedOption={selectedOptions[startIndex + index]}
              onOptionSelect={(option) => handleOptionSelect(startIndex + index, option)}
            />
          ))}

      <div className="text-right">
        <Button
          onClick={handleNextPage}
          disabled={!isCurrentPageAnswered()}
          className="w-full max-w-36"
        >
          {currentPage === Math.ceil(questions.length / questionsPerPage) - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
