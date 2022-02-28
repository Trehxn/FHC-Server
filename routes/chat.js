const express = require("express");

const router = express.Router();

const helpers = require("../helpers/chat");

router.route("/").get(helpers.fetchAllChat).post(helpers.createChat);

module.exports = router;
