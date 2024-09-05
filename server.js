require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./routes/tasks");
const bookRoutes = require("./routes/books");

// express app
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

app.use(cors());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.json());

// routes
app.use("/api/tasks", taskRoutes);
app.use("/api/books", bookRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");

    const port = process.env.PORT || 4000;
    // listen for requests
    app.listen(port, () => {
      console.log("listening on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
