const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const posts = await Post.find().then((res) => {
    return res;
  });

  res.status(200).json({
    message: "Successfully fetch data",
    posts,
  });
});

router.post("/", (req, res, next) => {
  const post = new Post({
    ...req.body,
  });
  post.save();
  res.status(201).json({
    message: "post add successfully",
    postId: post._id,
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((res) => {
    console.log(123, res);
  });
  res.status(200).json({
    message: "Post deleted!",
  });
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, { ...req.body }).then((result) => {
    console.log(123, result);
    res.status(200).json({
      message: "Post change successfully!!",
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({
        message: "Find post successfully!!",
        post,
      });
    } else {
      res.status(404).json({
        message: "Post not found!",
        post,
      });
    }
  });
});

module.exports = router;
