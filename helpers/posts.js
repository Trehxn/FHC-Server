const jwt = require("jsonwebtoken");

const Post = require("../models/posts");
const Comment = require("../models/comments");

const fetchPosts = async (req, res) => {
  try {
    const foundPosts = await Post.find({});

    if (!foundPosts) return res.status(404).json(foundPosts);
    return res.status(200).json(foundPosts);
  } catch (e) {
    return res.status(400).send(e);
  }
};

const createPost = async (req, res) => {
  try {
    const createPost = new Post({
      username: req.body.username,
      content: req.body.content,
    });
    const postSave = await createPost.save();

    if (!postSave) return res.status(404).json(postSave);

    res.status(200).json(postSave);
  } catch (e) {
    res.status(400).json(e);
  }
};

const deletePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const postDelete = await Post.deleteOne({ _id });

    if (!postDelete) return res.status(404).json("No post found");

    const commentDelete = await Comment.deleteMany({ postId: req.params.id });
    if (!commentDelete) return res.status(404).json(commentDelete);

    res.status(200).json(postDelete);
  } catch (e) {
    res.status(500).json(e);
  }
};

const fetchSinglePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const postFind = await Post.findOne({ _id });

    if (!postFind) return res.status(404).json(postFind);

    return res.json(postFind);
  } catch (e) {
    res.status(404).json(e);
  }
};

const updatePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const postUpdate = await Post.findByIdAndUpdate(
      _id,
      {
        content: req.body.content,
      },
      {
        new: true,
      }
    );
    if (!postUpdate) return res.status(404).json(postUpdate);

    res.status(200).json(postUpdate);
  } catch (e) {
    res.json(e);
  }
};

exports.fetchPosts = fetchPosts;
exports.fetchSinglePost = fetchSinglePost;
exports.createPost = createPost;
exports.deletePost = deletePost;
exports.updatePost = updatePost;
