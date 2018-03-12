const express = require('express');
const mongoose = require('mongoose');

// 链接mongo
const DB_URL = 'mongodb://localhost:27017/jobs';
mongoose.connect(DB_URL);
// 其实可以不需要
mongoose.connection.on('connected', function () {
    console.log('mongodb connected');
})

const User = mongoose.model('user', new mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true }
}))

// User.create({name:'sky',age:24},function(err,doc){
//     if(!err){
//         console.log(doc);
//     } else {
//         console.log(err);
//     }
// })

// User.remove({},function(err,doc){
//     console.log(doc)
// })

// User.update({'name':'sky'},{'$set':{age:26}},function(err,doc){
//     console.log(doc);
// })

const app = express();

app.get('/', function (req, res) {
    res.send('<h1>hello world</h1>')
})

app.get('/data', function (req, res) {
    User.findOne({}, function (err, doc) {
        res.json(doc);
    });
})



app.listen(9093, function () {
    console.log('Node app start at port 9093');
})