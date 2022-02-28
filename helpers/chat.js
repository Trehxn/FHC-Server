const Chat = require("../models/chat");

const fetchAllChat = async (req, res) => {
  try {
    const response = await Chat.find({});

    if (!response) return res.status(404).json(response);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).send(e);
  }
};

const createChat = async (req, res) => {
  try {
    const createChat = new Chat({
      username: req.body.username,
      message: req.body.message,
    });
    const chatSave = await createChat.save();

    if (!chatSave) return res.status(404).json(chatSave);

    res.status(200).json(chatSave);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.fetchAllChat = fetchAllChat;
exports.createChat = createChat;
