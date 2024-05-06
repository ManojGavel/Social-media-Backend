const express = require('express');
const app = express();
const userRouter = require('./Routers/UserRouter');
const postRouter = require('./Routers/PostRouter');
const friendsRouter = require('./Routers/FriendsRouter');
const multer = require('multer');
const upload = multer();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // Your React app's origin
    credentials: true, // To allow sending cookies and headers with the request
  }));

// app.use(upload.none());

app.use("/public", express.static(__dirname+"/public"));


app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/friends', friendsRouter);
module.exports = app;