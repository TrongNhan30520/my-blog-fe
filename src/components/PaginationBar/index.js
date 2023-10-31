import React from "react";

const PaginationBar = ({
  total,
  currentPage,
  nextPage,
  prePage,
  lastPage,
  className = "",
  setPage,
}) => {
  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center text-gray-600 ${className}`}
    >
      <span
        onClick={() => {
          if (prePage) setPage(prePage);
        }}
        className="flex p-2 mr-4 rounded hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </span>
      <span className="flex justify-center">
        {currentPage > 3 && (
          <span className="flex">
            <span
              onClick={() => {
                setPage(1);
              }}
              className="px-4 py-2 rounded hover:bg-gray-100 "
            >
              1
            </span>
            <span className="px-4 py-2 rounded hover:bg-gray-100">...</span>
          </span>
        )}
        {prePage && (
          <span
            onClick={() => {
              setPage(prePage);
            }}
            className="flex px-4 py-2 rounded hover:bg-gray-100 "
          >
            {prePage}
          </span>
        )}
        <span className="flex px-4 py-2 rounded bg-indigo-500  text-white">
          {currentPage}
        </span>
        <span
          onClick={() => {
            setPage(nextPage);
          }}
          className={`flex px-4 py-2 rounded hover:bg-gray-100 `}
        >
          {nextPage}
        </span>

        {currentPage < lastPage - 1 && (
          <span className="flex">
            <span className="px-4 py-2 rounded hover:bg-gray-100">...</span>
            <span
              onClick={() => {
                setPage(lastPage);
              }}
              className="px-4 py-2 rounded hover:bg-gray-100"
            >
              {lastPage}
            </span>
          </span>
        )}
      </span>

      <span
        onClick={() => {
          if (currentPage < lastPage) setPage(currentPage + 1);
        }}
        className="p-2 ml-4 rounded hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </nav>
  );
};

export default PaginationBar;
