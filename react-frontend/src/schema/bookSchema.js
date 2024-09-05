import * as yup from "yup";

function parseDateString(value, originalValue) {
  if (originalValue == "") {
    return null;
  }

  return value;
}

export const bookSchema = yup.object({
  title: yup.string().min(3).required("Title is required."),
  isbn: yup.string().required("ISBN is required."),
  author: yup.string().required("Author is required."),
  description: yup.string(),
  publisher: yup.string(),
  published_date: yup.date().nullable().transform(parseDateString),
});
