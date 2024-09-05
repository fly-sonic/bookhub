import React from "react";

const FormFiled = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  validationError,
}) => {
  if (type == "textarea") {
    return (
      <>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">
            {name.toUpperCase()}
          </label>
          <textarea
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            style={{ minHeight: "250px" }}
            className="w-full mx-auto shadow appearance-none border m-1 py-2 px-3 block text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {validationError && (
            <h1 className="text-red-600">{validationError}</h1>
          )}
        </div>
        <br />
      </>
    );
  }

  return (
    <>
      <div className="">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          {name.toUpperCase()}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full mx-auto shadow appearance-none border m-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {validationError && <h1 className="text-red-600">{validationError}</h1>}
      </div>
      <br />
    </>
  );
};

const BookForm = ({ book, validationErrors, onChange, onSubmit }) => {
  return (
    <form noValidate onSubmit={onSubmit} className="w-full max-w-lg mx-auto">
      <FormFiled
        type="text"
        placeholder="Title of the book"
        name="title"
        value={book.title || ""}
        onChange={onChange}
        validationError={validationErrors.title}
      />
      <FormFiled
        type="text"
        placeholder="ISBN of the book"
        name="isbn"
        value={book.isbn || ""}
        onChange={onChange}
        validationError={validationErrors.isbn}
      />
      <FormFiled
        type="text"
        placeholder="Author of the book"
        name="author"
        value={book.author || ""}
        onChange={onChange}
        validationError={validationErrors.author}
      />
      <FormFiled
        type="textarea"
        placeholder="Description of the book"
        name="description"
        value={book.description || ""}
        onChange={onChange}
        validationError={validationErrors.description}
      />
      <FormFiled
        type="text"
        placeholder="Publisher of the book"
        name="publisher"
        value={book.publisher || ""}
        onChange={onChange}
        validationError={validationErrors.publisher}
      />
      <FormFiled
        type="date"
        placeholder="published_date"
        name="published_date"
        value={book.published_date?.substring(0, 10) || ""}
        onChange={onChange}
        validationError={validationErrors.published_date}
      />

      <button
        className="block w-full border font-semibold py-2 px-5 hover:bg-blue-900/75 bg-blue-900 text-white "
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default BookForm;
