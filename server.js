const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./db/conn");

const app = express();

// APP SETUP

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//                                                             HOME

app.get("/", (req, res) => {
  res.send("hello world");
});

//                                                             USERS

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

//                                                             POSTS

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

//                                                             COMMENTS

const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);

//                                                              CHAT

const chatRouter = require("./routes/chat");
app.use("/chat", chatRouter);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
