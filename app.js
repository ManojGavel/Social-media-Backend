const express = require('express');
const app = express();
const userRouter = require('./Routers/UserRouter');
const postRouter = require('./Routers/PostRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

module.exports = app;