/*
 尽量保持入口文件精简
*/
const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
const Chat = model.getModel('chat');
const User = model.getModel('user');
const app = express();
// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('user login');
    socket.on('sendmsg', function (data) {
        const { from, to, msg } = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc));
        })
    })
})

app.use(bodyParser.json());
app.use(cookieParser())

app.use('/user', userRouter);

app.get('/', function (req, res) {
    res.send('<h2>服务端<h2>');
})

app.get('/data', function (req, res) {
    User.findOne({}, function (err, doc) {
        res.json(doc);
    });
})

server.listen(9093, function () {
    console.log('Node app start at port 9093');
})