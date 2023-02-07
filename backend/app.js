const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

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

app.get("/api/posts", async (req, res, next) => {
  const posts = await Post.find().then((res) => {
    return res;
  });

  res.status(200).json({
    message: "Successfully fetch data",
    posts,
  });
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    // title and content
    // title: req.body.title,
    // content: req.body.content
    ...req.body,
  });
  //auto return
  post.save();
  res.status(201).json({
    message: "post add successfully",
    postId: post._id
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((res) => {
    console.log(123, res);
  });
  res.status(200).json({
    message: "Post deleted!",
  });
});

module.exports = app;
