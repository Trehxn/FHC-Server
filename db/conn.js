const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Trehxn2:Trehxn2@cluster0.hnsg7.mongodb.net/fhcDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => console.log(e));
