const express = require("express");

const router = express.Router();

const helpers = require("../helpers/comments");

router.route("/").get(helpers.fetchComments);

router
  .route("/:id")
  .get(helpers.fetchCommentsByPostId)
  .post(helpers.createComment)
  .put(helpers.updateComment);

module.exports = router;
