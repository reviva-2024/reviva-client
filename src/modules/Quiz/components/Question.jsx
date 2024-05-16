import React from 'react';

const renderOption = (option, id) => {
  return (
    <label htmlFor={`option-${id}`}>
      <input type="checkbox" id={`option-${id}`} name={`option-${id}`} value={option} />
      <span className="ml-2">{option}</span>
    </label>
  );
};

const Question = ({ question, options, index }) => {
  return (
    <div className="m-6">
      <p className="mb-4">
        <span className="mr-2">{index + 1}.</span>
        <span>{question}</span>
      </p>
      <ul className="grid grid-cols-1 gap-y-1">
        {options.map((option, idx) => (
          <li key={`${option._id}-${idx}`}>
            {option.a && renderOption(option.a, `${option._id}-a`)}
            {option.b && renderOption(option.b, `${option._id}-b`)}
            {option.c && renderOption(option.c, `${option._id}-c`)}
            {option.d && renderOption(option.d, `${option._id}-d`)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
