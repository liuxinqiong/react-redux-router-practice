const mongoose = require('mongoose');
const DB_URL = require('./config').mongodb;
// 链接mongo
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true },
        'type': { type: String, require: true },
        'avatar': { type: String },
        // 个人简介或职业简介
        'desc': { type: String },
        // 职位名
        'title': { type: String },
        'company': { type: String },
        'money': { type: String }
    },
    chat: {
        chatid: { type: String, require: true },
        from: { type: String, require: true },
        to: { type: String, require: true },
        read: { type: Boolean, default: false },// 仅对to有效
        content: { type: String, require: true, default: '' },
        create_time: { type: Number, default: new Date().getTime() }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
}