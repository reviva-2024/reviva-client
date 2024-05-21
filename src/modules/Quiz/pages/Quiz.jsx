import React, { useEffect, useRef, useState } from 'react';
import Question from '../components/Question';
import { getAllQuizesApi, updateQuizeMarkApi } from '../api/quizApi';
import { toast } from 'sonner';
import { useAuth } from '../../User/context/AuthContext';
import { Style, logs } from '../../../utils/logs';
import QuestionSkeleton from '../components/QuestionSkeleton';
import { Button } from '../../../components/buttons/button';
import { useNavigate } from 'react-router-dom';
import { useScrollToTop } from '../../../hooks/useScrollToTop';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(''));
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const quizRef = useRef(null);

  const questionsPerPage = 5;

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

  const updateQuizeMark = async () => {
    const updatedQuizeMark = calculateScore();
    const res = await updateQuizeMarkApi(user.token, { quizMark: updatedQuizeMark });
    if (res.status === '200') {
      toast.success(res.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  const handleNextPage = () => {
    if (currentPage === Math.ceil(questions.length / questionsPerPage) - 1) {
      navigate('/quiz-result', {
        state: {
          score: calculateScore(),
          questions: questions,
          selectedOptions: selectedOptions,
        },
      });

      updateQuizeMark();
      localStorage.removeItem('selectedOptions');
      localStorage.removeItem('currentPage');
    } else {
      setCurrentPage((prev) => prev + 1);
      useScrollToTop(quizRef);
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);
  const isCurrentPageAnswered = () => {
    return selectedOptions.slice(startIndex, endIndex).every((option) => option !== '');
  };

  // Load state from local storage on component mount
  useEffect(() => {
    setLoading(true);
    const storedSelectedOptions = localStorage.getItem('selectedOptions');
    const storedCurrentPage = localStorage.getItem('currentPage');

    if (storedSelectedOptions && storedCurrentPage) {
      console.log('storedSelectedOptions', storedSelectedOptions);
      console.log('storedCurrentPage', storedCurrentPage);
      setSelectedOptions(JSON.parse(storedSelectedOptions));
      setCurrentPage(parseInt(storedCurrentPage));
      setLoading(false);
    }
    setLoading(false);
  }, []);

  // Update local storage when selected options or current page change
  useEffect(() => {
    // To prevent resetting values on first render.
    if (!loading) {
      localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
      localStorage.setItem('currentPage', currentPage.toString());
    }
  }, [selectedOptions, currentPage]);

  useEffect(() => {
    setLoading(true);

    const fetchQuizes = async () => {
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
    fetchQuizes();
  }, [user.token]);

  return (
    <div className="grid w-full max-h-screen gap-5 p-5 overflow-y-auto ms-20" ref={quizRef}>
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
