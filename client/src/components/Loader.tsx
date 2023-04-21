import { useState } from "react";

const Loader = () => {
  const [res, setRes] = useState(false);

  function simularPeticion() {
    setRes(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(setRes(false));
      }, 1000);
    });
  }

  return (
    <div>
      <button
        type="submit"
        className="bg-blue text-white w-full h-[60px] rounded-md"
        onClick={simularPeticion}
      >
        {res ? (
          <div className="flex justify-center items-center ">
            <svg
              className="mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="font-medium"> Loading </span>
          </div>
        ) : (
          <p className="font-bold text-md">Submit</p>
        )}
      </button>
    </div>
  );
};
export default Loader;
