import React, { useState } from 'react';
import Question from '../components/Question';

const Quiz = () => {
  const questions = [
    {
      _id: '664067b2556f0b150055b0bd',
      question: 'How do you typically approach solving a challenging problem at work?',
      options: [
        {
          _id: '6646245684eae3c25376a55e',
          a: 'Dive straight into finding a solution without much planning',
          mark: 3,
        },
        {
          _id: '6646245684eae3c25376a55f',
          b: 'Analyze the problem thoroughly before devising a solution',
          mark: 4,
        },
        {
          _id: '6646245684eae3c25376a560',
          c: 'Seek guidance from others immediately',
          mark: 2,
        },
        {
          _id: '6646245684eae3c25376a561',
          d: 'Avoid confronting the problem altogether',
          mark: 1,
        },
      ],
    },
    {
      _id: '664067b2556f0b150055b0be',
      question: 'How do you typically ensure diversity and inclusion in your team?',
      options: [
        {
          _id: '6646245684eae3c25376a562',
          a: "I don't actively consider diversity and inclusion",
          mark: 1,
        },
        {
          _id: '6646245684eae3c25376a563',
          b: 'By encouraging open discussions and embracing diverse perspectives',
          mark: 4,
        },
        {
          _id: '6646245684eae3c25376a564',
          c: 'By enforcing strict rules and guidelines',
          mark: 3,
        },
        {
          _id: '6646245684eae3c25376a565',
          d: 'By avoiding controversial topics',
          mark: 2,
        },
      ],
    },
    {
      _id: '664067b2556f0b150055b0bf',
      question:
        'When communicating complex information to a non-technical audience, what is your preferred strategy?',
      options: [
        {
          _id: '6646245684eae3c25376a566',
          a: 'Use technical jargon to demonstrate expertise',
          mark: 1,
        },
        {
          _id: '6646245684eae3c25376a567',
          b: 'Simplify concepts and use relatable examples',
          mark: 4,
        },
        {
          _id: '6646245684eae3c25376a568',
          c: 'Avoid discussing complex topics altogether',
          mark: 3,
        },
        {
          _id: '6646245684eae3c25376a569',
          d: "Provide lengthy explanations without considering the audience's understanding",
          mark: 2,
        },
      ],
    },
    {
      _id: '664067b2556f0b150055b0c0',
      question: 'In a male-dominated environment, how do you typically demonstrate leadership?',
      options: [
        {
          _id: '6646245684eae3c25376a56a',
          a: 'By conforming to traditional gender roles',
          mark: 1,
        },
        {
          _id: '6646245684eae3c25376a56b',
          b: 'By asserting myself and challenging gender biases',
          mark: 4,
        },
        {
          _id: '6646245684eae3c25376a56c',
          c: 'By avoiding leadership positions',
          mark: 2,
        },
        {
          _id: '6646245684eae3c25376a56d',
          d: 'By blending into the background',
          mark: 3,
        },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (
      selectedOption ===
      questions[currentQuestionIndex].options.find((opt) => opt.option === selectedOption).mark
    ) {
      setScore(score + 1);
    }
    setSelectedOption('');
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption('');
    setScore(0);
    setShowResult(false);
  };

  // return (
  //   <div>
  //     {!showResult ? (
  //       <div>
  //         <h1>Question {currentQuestionIndex + 1}</h1>
  //         <h2>{questions[currentQuestionIndex].question}</h2>
  //         <ul>
  //           {questions[currentQuestionIndex].options.map((option, index) => (
  //             <li key={index}>
  //               <button onClick={() => handleOptionSelect(option.a)}>{option.option}</button>
  //             </li>
  //           ))}
  //         </ul>
  //         <button onClick={handleNextQuestion}>Next</button>
  //       </div>
  //     ) : (
  //       <div>
  //         <h1>Quiz Result</h1>
  //         <p>
  //           Your Score: {score} out of {questions.length}
  //         </p>
  //         <button onClick={restartQuiz}>Restart Quiz</button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="grid">
      {questions.map(({ _id, question, options }, index) => (
        <Question key={_id} question={question} options={options} index={index} />
      ))}
    </div>
  );
};
export default Quiz;
