

const NavigationButton = ({ direction = "next", onClick }) => {
    const isNext = direction === "next";
    return (
      <button
        type="button"
        onClick={onClick}
        className="group inline-flex items-center border border-green-300 dark:border-blue-600 px-4 py-2 rounded-md text-green-500 dark:text-blue-500 hover:bg-green-50 dark:hover:bg-gray-900"
      >
        {isNext ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 transition-transform duration-300 transform group-hover:translate-x-1 group-focus:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            <span className="mr-2 ">بعدی</span>
          </>
        ) : (
          <>
            <span className="ml-2 ">قبلی</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:-translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 8l-4 4m0 0l4 4m-4-4h18"
              />
            </svg>
          </>
        )}
      </button>
    );
  };
  
  export default NavigationButton;
  