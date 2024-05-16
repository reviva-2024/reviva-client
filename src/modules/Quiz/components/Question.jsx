import React, { useState } from 'react';

const Question = ({ question, options, index }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (optionValue) => {
    setSelectedOption(optionValue);
  };

  const renderOption = (option, id, groupName) => {
    return (
      <label htmlFor={id}>
        <input
          type="radio"
          id={id}
          name={groupName}
          value={option}
          checked={selectedOption === option}
          onChange={() => handleOptionChange(option)}
        />
        <span className="ml-2">{option}</span>
      </label>
    );
  };

  return (
    <div className="m-6">
      <p className="mb-4">
        <span className="mr-2">{index + 1}.</span>
        <span>{question}</span>
      </p>
      <ul className="grid grid-cols-1 gap-y-1">
        {options.map((option, idx) => (
          <li key={`${option._id}-${idx}`}>
            {option.a && renderOption(option.a, `${option._id}-a`, `option-${option._id}`)}
            {option.b && renderOption(option.b, `${option._id}-b`, `option-${option._id}`)}
            {option.c && renderOption(option.c, `${option._id}-c`, `option-${option._id}`)}
            {option.d && renderOption(option.d, `${option._id}-d`, `option-${option._id}`)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
