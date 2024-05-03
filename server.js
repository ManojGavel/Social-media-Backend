const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT ;
const DB = process.env.DB;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qdsyalo.mongodb.net/SocialMedia?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost${PORT}`);
});
