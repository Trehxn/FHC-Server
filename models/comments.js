const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
