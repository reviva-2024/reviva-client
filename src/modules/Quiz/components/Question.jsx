import React from 'react';

const Question = ({ question, options, selectedOption, onOptionSelect, index }) => {
  const handleOptionChange = (optionValue) => {
    onOptionSelect(optionValue);
  };

  const renderOption = (option, id, groupName) => {
    return (
      <label
        htmlFor={id}
        className={`px-2 w-full inline-block py-2 rounded-lg ${selectedOption === id ? 'bg-primary bg-opacity-80  font-semibold text-white ' : ''}`}
      >
        <input
          type="radio"
          id={id}
          name={groupName}
          value={option}
          checked={selectedOption === id}
          onChange={() => handleOptionChange(id)}
        />
        <span className="ml-2">{option}</span>
      </label>
    );
  };

  return (
    <div className="w-full bg-[#FEF7E7] rounded-lg ">
      <p className="px-4 py-3 font-semibold rounded-t-lg bg-secondary">
        <span className="mr-1">{index + 1}.</span>
        <span>{question}</span>
      </p>
      <ul className="grid grid-cols-1 px-4 my-4 gap-y-3">
        {options.map((option, idx) => (
          <li key={`${option._id}-${idx}`}>
            {option.a && renderOption(option.a, `${option._id}`, `option-${option._id}`)}
            {option.b && renderOption(option.b, `${option._id}`, `option-${option._id}`)}
            {option.c && renderOption(option.c, `${option._id}`, `option-${option._id}`)}
            {option.d && renderOption(option.d, `${option._id}`, `option-${option._id}`)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
