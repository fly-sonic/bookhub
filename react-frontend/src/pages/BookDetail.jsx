import React from "react";
import useFetch from "../hooks/useFetch.js";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import Error from "../components/Error.jsx";
import { Link } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();

  const {
    error,
    isPending,
    data: book,
  } = useFetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/books/${id}`);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div className="container py-10">
      {book && (
        <>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-5 text-center ">
            Book Details
          </h1>
          <div className="w-full mx-auto">
            <table className="w-full max-w-3xl mx-auto">
              <tbody className=" [&>*:nth-child(odd)]:bg-slate-100 [&>*:nth-child(even)]:bg-slate-50">
                <tr>
                  <th className="px-3 py-3 align-top text-left ">TITLE</th>
                  <td className="px-5 py-3 align-top text-left ">
                    {book.title}
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 align-top text-left ">ISBN</th>
                  <td className="px-5 py-3 align-top text-left ">
                    {book.isbn}
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 align-top text-left ">AUTHOR</th>
                  <td className="px-5 py-3 align-top text-left ">
                    {book.author}
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 align-top text-left ">
                    DESCRIPTION
                  </th>
                  <td className="px-5 py-3 align-top text-left ">
                    {book.description}
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 align-top text-left ">
                    PUBLISHED DATE
                  </th>
                  <td className="px-5 py-3 align-top text-left ">
                    {book.published_date?.substring(0, 10)}
                  </td>
                </tr>
                <tr>
                  <th className="px-3 py-3 align-top text-left ">PUBLISHER</th>
                  <td className="px-5 py-3 align-top text-left ">
                    {book.publisher}
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <Link to={`/edit-book/${book._id}`}>
              <button className="block w-full max-w-3xl mx-auto border font-semibold py-2 px-5 hover:bg-blue-900/75 bg-blue-900 text-white ">
                Edit this Book
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetail;
