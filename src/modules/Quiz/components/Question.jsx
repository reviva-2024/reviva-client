import React from 'react';

const Question = ({ question, options, selectedOption, onOptionSelect, index }) => {
  const handleOptionChange = (optionValue) => {
    onOptionSelect(optionValue);
  };

  const renderOption = (option, id, groupName) => {
    return (
      <label
        htmlFor={id}
        className={`flex items-center px-2 w-full  py-2 rounded-lg transition-all duration-200 cursor-pointer ${selectedOption === id ? 'bg-primary bg-opacity-80  font-semibold text-white ' : 'hover:text-white hover:bg-primary  '}`}
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
    <section className="w-full bg-[#FEF7E7] rounded-lg ">
      <p className="px-4 py-3 font-semibold rounded-t-lg bg-secondary">
        <span className="mr-1">{index + 1}.</span>
        <span>{question}</span>
      </p>
      <div className="grid grid-cols-1 px-4 my-4 gap-y-3">
        {options.map((option) => (
          <div key={option._id}>
            {renderOption(option.option, option._id, `option-${option._id}`)}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Question;
