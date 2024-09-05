import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/bookService";
import BookForm from "../components/BookForm";
import { bookSchema } from "../schema/bookSchema";

const CreateBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    publisher: "",
    published_date: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    publisher: "",
    published_date: "",
  });

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
      const res = await createBook(book);
      setBook({
        title: "",
        isbn: "",
        author: "",
        description: "",
        publisher: "",
        published_date: "",
      });
      navigate(`/book/${res.data._id}`); // Push to book detail page
    } catch {
      console.log("Error in CreateBook!");
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-5 text-center ">
        Create a New Book
      </h1>
      <BookForm
        book={book}
        validationErrors={validationErrors}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default CreateBook;
