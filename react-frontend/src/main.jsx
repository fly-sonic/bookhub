import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorPage from "./error-page.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Index from "./pages/Index.jsx";
import BookList from "./pages/BookList.jsx";
import BookDetail from "./pages/BookDetail";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "/books", element: <BookList /> },
      { path: "/book/:id", element: <BookDetail /> },
      { path: "/create-book", element: <CreateBook /> },
      { path: "/edit-book/:id", element: <EditBook /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
