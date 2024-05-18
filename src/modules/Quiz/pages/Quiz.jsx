import React, { useEffect, useRef, useState } from 'react';
import Question from '../components/Question';
import { getAllQuizesApi } from '../api/quizApi';
import { toast } from 'sonner';
import { useAuth } from '../../User/context/AuthContext';
import { Style, logs } from '../../../utils/logs';
import QuestionSkeleton from '../components/QuestionSkeleton';
import { Button } from '../../../components/buttons/button';
import { useNavigate } from 'react-router-dom';
const questions = [
  {
    _id: '664067b2556f0b150055b0bd',
    question: 'How do you typically approach solving a challenging problem at work?',
    markingCriteria: 'Strong problem-solving and critical thinking skills',
    options: [
      {
        _id: '6648ba07f0b9186be38bfbb4',
        label: 'a',
        option: 'Dive straight into finding a solution without much planning',
        mark: 3,
      },
      {
        _id: '6648ba07f0b9186be38bfbb5',
        label: 'b',
        option: 'Analyze the problem thoroughly before devising a solution',
        mark: 4,
      },
      {
        _id: '6648ba07f0b9186be38bfbb6',
        label: 'c',
        option: 'Seek guidance from others immediately',
        mark: 2,
      },
      {
        _id: '6648ba07f0b9186be38bfbb7',
        label: 'd',
        option: 'Avoid confronting the problem altogether',
        mark: 1,
      },
    ],
  },
  {
    _id: '664067b2556f0b150055b0be',
    question: 'How do you typically ensure diversity and inclusion in your team?',
    markingCriteria: 'Alignment with company culture, leadership, and future orientation',
    options: [
      {
        _id: '6648ba07f0b9186be38bfbb8',
        label: 'a',
        option: "I don't actively consider diversity and inclusion",
        mark: 1,
      },
      {
        _id: '6648ba07f0b9186be38bfbb9',
        label: 'b',
        option: 'By encouraging open discussions and embracing diverse perspectives',
        mark: 4,
      },
      {
        _id: '6648ba07f0b9186be38bfbba',
        label: 'c',
        option: 'By enforcing strict rules and guidelines',
        mark: 3,
      },
      {
        _id: '6648ba07f0b9186be38bfbbb',
        label: 'd',
        option: 'By avoiding controversial topics',
        mark: 2,
      },
    ],
  },
  {
    _id: '664067b2556f0b150055b0bf',
    question:
      'When communicating complex information to a non-technical audience, what is your preferred strategy?',
    markingCriteria: 'Communication and interpersonal skills, adaptability, and resilience',
    options: [
      {
        _id: '6648ba07f0b9186be38bfbbc',
        label: 'a',
        option: 'Use technical jargon to demonstrate expertise',
        mark: 1,
      },
      {
        _id: '6648ba07f0b9186be38bfbbd',
        label: 'b',
        option: 'Simplify concepts and use relatable examples',
        mark: 4,
      },
      {
        _id: '6648ba07f0b9186be38bfbbe',
        label: 'c',
        option: 'Avoid discussing complex topics altogether',
        mark: 3,
      },
      {
        _id: '6648ba07f0b9186be38bfbbf',
        label: 'd',
        option: "Provide lengthy explanations without considering the audience's understanding",
        mark: 2,
      },
    ],
  },
  {
    _id: '664067b2556f0b150055b0c0',
    question: 'In a male-dominated environment, how do you typically demonstrate leadership?',
    markingCriteria: 'Leadership and initiative, adaptability, gender consideration',
    options: [
      {
        _id: '6648ba07f0b9186be38bfbc0',
        label: 'a',
        option: 'By conforming to traditional gender roles',
        mark: 1,
      },
      {
        _id: '6648ba07f0b9186be38bfbc1',
        label: 'b',
        option: 'By asserting myself and challenging gender biases',
        mark: 4,
      },
      {
        _id: '6648ba07f0b9186be38bfbc2',
        label: 'c',
        option: 'By avoiding leadership positions',
        mark: 2,
      },
      {
        _id: '6648ba07f0b9186be38bfbc3',
        label: 'd',
        option: 'By blending into the background',
        mark: 3,
      },
    ],
  },
  {
    _id: '664067b2556f0b150055b0c1',
    question:
      'How do you manage your personal and professional commitments to maintain a healthy work-life balance?',
    markingCriteria:
      'Adaptability and resilience, future orientation, ethical integrity, and professionalism',
    options: [
      {
        _id: '6648ba07f0b9186be38bfbc4',
        label: 'a',
        option: 'By prioritizing work over personal commitments',
        mark: 2,
      },
      {
        _id: '6648ba07f0b9186be38bfbc5',
        label: 'b',
        option: 'By setting boundaries and managing time effectively',
        mark: 4,
      },
      {
        _id: '6648ba07f0b9186be38bfbc6',
        label: 'c',
        option: 'By neglecting personal commitments for the sake of work',
        mark: 3,
      },
      {
        _id: '6648ba07f0b9186be38bfbc7',
        label: 'd',
        option: 'By avoiding personal commitments altogether',
        mark: 1,
      },
    ],
  },
];

const Quiz = () => {
  // const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState(new Array(questions.length).fill(''));
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  // const { user } = useAuth();

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

  const handleNextPage = () => {
    if (currentPage === Math.ceil(questions.length / questionsPerPage) - 1) {
      navigate('/quiz-result', {
        state: {
          score: calculateScore(),
          questions: questions,
          selectedOptions: selectedOptions,
        },
      });

      localStorage.removeItem('selectedOptions');
      localStorage.removeItem('currentPage');
    } else {
      setCurrentPage((prev) => prev + 1);
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

  // useEffect(() => {
  //   setLoading(true);

  //   const getAllPurchaseReport = async () => {
  //     const response = await getAllQuizesApi(user.token);
  //     logs('getAllQuizes useEffect:', [response], Style.effects);

  //     if (response.data.success) {
  //       setQuestions(response.data.data);
  //       setSelectedOptions(new Array(response.data.data.length).fill(''));
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //       toast.error(response.data.message);
  //     }
  //   };
  //   getAllPurchaseReport();
  // }, [user.token]);

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
