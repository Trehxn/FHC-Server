const Comment = require("../models/comments");

const fetchComments = async (req, res) => {
  try {
    const foundComments = await Comment.find({});

    if (!foundComments) return res.status(200).json(foundComments);
    res.status(200).json(foundComments);
  } catch (e) {
    res.status(400).json(e);
  }
};

const fetchCommentsByPostId = async (req, res) => {
  try {
    const foundComments = await Comment.find({ postId: req.params.id });

    if (!foundComments) return res.status(200).json(foundComments);
    res.status(200).json(foundComments);
  } catch (e) {
    res.status(400).json(e);
  }
};

const createComment = async (req, res) => {
  try {
    const createComment = new Comment({
      postId: req.body.postId,
      username: req.body.username,
      content: req.body.content,
    });
    const commentSave = await createComment.save();

    if (!commentSave) return res.status(404).json(commentSave);

    res.status(200).json(commentSave);
  } catch (e) {
    res.status(400).json(e);
  }
};

const fetchSingleComment = async (req, res) => {
  try {
    const _id = req.params.id;
    const commentFind = await Comment.findOne({ _id });

    if (!commentFind) return res.status(404).json(commentFind);

    res.status(200).json(commentFind);
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateComment = async (req, res) => {
  try {
    const _id = req.params.id;
    const commentUpdate = await Comment.findByIdAndUpdate(
      _id,
      {
        name: req.body.name,
        content: req.body.content,
      },
      {
        new: true,
      }
    );

    if (!commentUpdate) return res.status(404).json(commentUpdate);

    res.status(200).json(commentUpdate);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.fetchComments = fetchComments;
exports.fetchCommentsByPostId = fetchCommentsByPostId;
exports.fetchSingleComment = fetchSingleComment;
exports.createComment = createComment;
exports.updateComment = updateComment;
