const User = require("../models/users");
const jwt = require("jsonwebtoken");

const fetchUsers = async (req, res) => {
  try {
    const usersFind = await User.find({});

    if (!usersFind) return res.status(404).json(usersFind);
    return res.status(200).json(usersFind);
  } catch (e) {
    return res.status(400).json(e);
  }
};

const createUser = async (req, res) => {
  try {
    const createUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const saveUser = await createUser.save();

    if (!saveUser) return res.status(404).json("User not created");
    res.status(200).json(saveUser);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const userDelete = await User.deleteOne({ _id });

    if (!userDelete) return res.status(404).json(userDelete);
    res.stastus(200).json(userDelete);
  } catch (e) {
    res.status(500).json(e);
  }
};

const fetchSingleUser = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const userFind = await User.findOne({ _id });

    if (!userFind) return res.status(404).json(userFind);
    res.json(userFind);
  } catch (e) {
    res.json(e);
  }
};

const fetchSingleUserByUsername = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFind = await User.findOne(
      {
        username: username,
        password: password,
      },
      "-password"
    );

    if (!userFind)
      return res.status(404).json(`No user with username: ${username}`);

    if (userFind) {
      const token = jwt.sign(
        {
          _id: userFind._id,
          username: userFind.username,
        },
        "trehxn"
      );

      return res.json({ status: "ok", user: userFind, token });
    } else {
      res.status(404).json({ status: "error", user: false });
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const userUpdate = await User.findByIdAndUpdate(
      _id,
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        new: true,
      }
    );
    if (!userUpdate) return res.status(404).json(userUpdate);
    res.status(200).json(userUpdate);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.fetchUsers = fetchUsers;
exports.fetchSingleUser = fetchSingleUser;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.fetchSingleUserByUsername = fetchSingleUserByUsername;
