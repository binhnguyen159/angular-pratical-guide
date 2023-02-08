const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routerPosts = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://binh:1234@angulartutorial.u71kntl.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connected failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//resolve cors issue
app.use((req, res, next) => {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader(
    "access-control-allow-headers",
    "origin, x-requested-with, content-type, accept"
  );
  res.setHeader(
    "access-control-allow-methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  next();
});

app.use("/api/posts", routerPosts);

module.exports = app;
