const express = require('express');
const app = express();
const userRouter = require('./Routers/UserRouter');
const postRouter = require('./Routers/PostRouter');
const multer = require('multer');
const upload = multer();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// app.use(upload.none());

app.use("/public", express.static(__dirname+"/public"));


app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;