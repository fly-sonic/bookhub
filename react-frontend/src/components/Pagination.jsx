import React from "react";

const Pagination = ({ totalPageCount, currentPage, changePage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="">
      <ul className="inline-flex  rounded-md shadow-sm">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`${
              number == currentPage ? "bg-blue-500" : "hover:bg-gray-200"
            } cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 `}
            onClick={() => changePage(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
