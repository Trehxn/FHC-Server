const express = require("express");
const helpers = require("../helpers/users");
const jwt = require("jsonwebtoken");

const router = express.Router();

const verifyJWT = (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) res.send("login for token");

  jwt.verify(token, "trehxn", (err, decoded) => {
    if (err) res.send({ status: "error", user: false });
    req.username = decoded.username;
  });
};

router.route("/").get(helpers.fetchUsers).post(helpers.createUser);

router.route("/:id").delete(helpers.deleteUser).put(helpers.updateUser);

router.route("/username").post(helpers.fetchSingleUserByUsername);

module.exports = router;
