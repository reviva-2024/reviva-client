// Reusable Toggle Button Component
const ToggleBtn = ({ isChecked, onToggle, labels, loading }) => {
  return (
    <button
      className={`flex items-center p-1 w-12 h-7 rounded-full cursor-pointer bg-primary-light ${loading && 'bg-primary'}`}
      onClick={onToggle}
    >
      {!loading && (
        <p
          className={`w-1/2 h-full flex items-center  justify-center bg-primary text-white  dark:bg-green-300   rounded-full transform transition-transform text-[10px] uppercase  font-bold  ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        >
          <span className="m-1">{isChecked ? labels[1] : labels[0]}</span>
        </p>
      )}
    </button>
  );
};

export default ToggleBtn;
