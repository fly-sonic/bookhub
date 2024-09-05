import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateBook, deleteBook } from "../services/bookService";
import BookForm from "../components/BookForm";
import { bookSchema } from "../schema/bookSchema";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import useFetch from "../hooks/useFetch.js";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [validationErrors, setValidationErrors] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    publisher: "",
    published_date: "",
  });

  const {
    error,
    isPending,
    data: book,
    setData: setBook,
  } = useFetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/books/${id}`);

  const onChange = async (e) => {
    const newBook = { ...book, [e.target.name]: e.target.value };
    setBook(newBook);

    try {
      await bookSchema.validate(newBook, { abortEarly: false });
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: "",
      });
    } catch (error) {
      const err = error.inner.filter((err) => err.path == e.target.name);
      if (err.length == 0) {
        setValidationErrors({
          ...validationErrors,
          [e.target.name]: "",
        });
      } else {
        setValidationErrors({
          ...validationErrors,
          [e.target.name]: err[0].message,
        });
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newValidationErrors = {
      title: "",
      isbn: "",
      author: "",
      description: "",
      publisher: "",
      published_date: "",
    };
    try {
      await bookSchema.validate(book, { abortEarly: false });
      setValidationErrors(newValidationErrors);
    } catch (error) {
      error.inner.forEach((err) => {
        newValidationErrors[err.path] = err.message;
      });
      setValidationErrors(newValidationErrors);
      return;
    }

    try {
      await updateBook(id, book);
      setBook({
        title: "",
        isbn: "",
        author: "",
        description: "",
        publisher: "",
        published_date: "",
      });
      navigate(`/book/${id}`); // Push to book detail page
    } catch {
      console.log("Error in EditBook!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBook(id);

      navigate(`/books`); // Push to book listing page
    } catch {
      console.log("Error in EditBook!");
    }
  };

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <>
      {book && (
        <div className="container py-10">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-5 text-center ">
            Edit Book
          </h1>
          <div className="w-full max-w-lg mx-auto">
            <BookForm
              book={book}
              validationErrors={validationErrors}
              onChange={onChange}
              onSubmit={onSubmit}
            />
            <br />
            <button
              className="block w-full border font-semibold py-2 px-5 hover:bg-red-500/75 bg-red-500 text-white "
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBook;
