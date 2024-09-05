import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import { Link } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import { deleteBook } from "../services/bookService";
import { TiDelete } from "react-icons/ti";
import Pagination from "../components/Pagination.jsx";

const COUNT_PER_PAGE = 4;

const filterBooks = (books, searchText) => {
  const searchTextInLowerCase = searchText.toLowerCase();
  const filtered = books?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTextInLowerCase) ||
      book.author.toLowerCase().includes(searchTextInLowerCase) ||
      book.description.toLowerCase().includes(searchTextInLowerCase)
  );
  return filtered;
};

function BookCard({ book, handleDelete }) {
  return (
    <div className="w-full lg:w-2/5 max-w-lg  py-4 ">
      <div className="flex flex-col p-6 h-full rounded-xl border-solid border border-gray-50 shadow-md">
        <div className="flex mb-4 md:mb-9">
          <h1 className="text-xl font-semibold ">{book.title}</h1>
          <div className="grow"></div>
        </div>

        <p className="text-slate-500 mb-4 md:mb-9">
          {book.description ? (
            <>
              {book.description <= 500
                ? book.description
                : book.description.slice(0, 500) + "..."}
            </>
          ) : (
            <span className="italic">This book has no description.</span>
          )}
        </p>

        <div className="grow"></div>

        <Link
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          to={`/book/${book._id}`}
        >
          <button className="font-semibold py-2 px-3 text-sm hover:bg-black/75 bg-black text-white rounded shadow-lg">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
}

const BookList = () => {
  const {
    error,
    isPending,
    data: books,
    setData: setBooks,
  } = useFetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/books`);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const filteredBooks = filterBooks(books, searchText);
  const displayedBooks = filteredBooks?.slice(
    COUNT_PER_PAGE * (currentPage - 1),
    COUNT_PER_PAGE * currentPage
  );
  const totalPageCount = Math.ceil(filteredBooks?.length / COUNT_PER_PAGE);

  useEffect(() => {
    if (totalPageCount < currentPage) {
      setCurrentPage(1);
    }
  }, [searchText]);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id != id));
    } catch {
      console.log("Error in BookList!");
    }
  };

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  console.log("!filteredBooks", !filteredBooks);

  return (
    <div className="container py-4">
      <div className="">
        <input
          type="text"
          className="my-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter text to search for books"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
        />
      </div>

      {books && (
        <>
          {!filteredBooks || filteredBooks.length == 0 ? (
            <h1 className="text-lg text-center my-5">
              There are no books found.
            </h1>
          ) : (
            <>
              <Pagination
                totalPageCount={totalPageCount}
                currentPage={currentPage}
                changePage={(targetPage) => {
                  setCurrentPage(targetPage);
                }}
              />
              <div className="flex flex-wrap justify-evenly gap-2">
                {displayedBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;
