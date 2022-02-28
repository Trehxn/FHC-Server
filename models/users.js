const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 3,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
