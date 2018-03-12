/*
 尽量保持入口文件精简
*/
const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser())

app.use('/user', userRouter);

app.get('/', function (req, res) {
    res.send('<h2>服务端<h2>');
})

app.listen(9093, function () {
    console.log('Node app start at port 9093');
})