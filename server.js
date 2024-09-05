require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const taskRoutes = require("./routes/tasks");
const bookRoutes = require("./routes/books");

// express app
const app = express();

// This code makes sure that any request that does not matches a static file
// in the client/build folder, will just serve index.html. Client side routing is
// going to make sure that the correct content will be loaded.
app.use((req, res, next) => {
  if (/^\/api/i.test(req.path) || /(.ico|.js|.css|.jpg|.png|.map|.svg)$/i.test(req.path)) {
    next();
  } else {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  }
});
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
