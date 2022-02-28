const express = require("express");

const router = express.Router();

const helpers = require("../helpers/posts");

router.route("/").get(helpers.fetchPosts).post(helpers.createPost);

router
  .route("/:id")
  .get(helpers.fetchSinglePost)
  .delete(helpers.deletePost)
  .put(helpers.updatePost);

module.exports = router;
