import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const getBooks = async () => {
  return await axios.get(`${baseUrl}/api/books`);
};

const getBook = async (id) => {
  return await axios.get(`${baseUrl}/api/books/${id}`);
};

const createBook = async (book) => {
  return await axios.post(`${baseUrl}/api/books`, book);
};

const updateBook = async (id, book) => {
  return await axios.patch(`${baseUrl}/api/books/${id}`, book);
};

const deleteBook = async (id) => {
  return await axios.delete(`${baseUrl}/api/books/${id}`);
};

export { getBooks, getBook, createBook, updateBook, deleteBook };
