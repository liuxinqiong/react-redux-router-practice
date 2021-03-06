const express = require('express');
const router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const md5Pwd = require('./util').md5Pwd;
const _filter = { pwd: 0, __v: 0 };

router.get('/info', function (req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        // 用户有没有cookie
        return res.json({ code: 1, msg: 'cookie为空' });
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错啦' });
        }
        if (doc) {
            return res.json({ code: 0, data: doc });
        }
    })
})

router.get('/list', function (req, res) {
    // User.remove({}, function (err, doc) { });
    const type = req.query.type;
    const filter = type ? { type } : {};
    User.find(filter, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错啦' });
        }
        return res.json({ code: 0, data: doc });
    })
})

router.get('/getMsgList', function (req, res) {
    const user = req.cookies.userid;
    if (!user) {
        // 用户有没有cookie
        return res.json({ code: 1, msg: 'cookie为空' });
    }
    let users = {};
    // 需要用promise，存在异步问题
    // User.find({}, function (err, doc) {
    //     // 构建user数据字典
    //     doc.forEach(v => {
    //         users[v._id] = { name: v.user, avatar: v.avatar }
    //     });
    // })

    // Chat.find({ '$or': [{ from: user }, { to: user }] }, function (err, doc) {
    //     if (!err) {
    //         return res.json({ code: 0, msgs: doc, users: users })
    //     }
    // })
    const promises = [User.find({}).exec(), Chat.find({ '$or': [{ from: user }, { to: user }] }).exec()];
    Promise.all(promises).then(function (result) {
        const [userDoc, msgs] = result;
        // 构建user数据字典
        userDoc.forEach(v => {
            users[v._id] = { name: v.user, avatar: v.avatar }
        });
        return res.json({ code: 0, msgs, users: users })
    }).catch(function (e) {
        return res.json({ code: 1, msg: '服务器出错啦' })
    })
    // todo:最佳方式使用连表查询，直接将from和user转成对象
})

router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body;
    User.findOne({ user: user }, function (err, doc) {
        if (doc) {
            return res.json({ code: 1, msg: '用户名重复' });
        }

        const userModel = new User({ user, pwd: md5Pwd(pwd), type });

        userModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '服务器出错了' });
            }
            const { user, type, _id } = d;
            res.cookie('userid', _id);
            return res.json({ code: 0, data: { user, type, _id } });
        });

        /* create得不到id
        User.create({ user, pwd: md5Pwd(pwd), type }, function (err, doc) {
            if (err) {
                return res.json({ code: 1, msg: '服务器出错了' });
            }
            return res.json({ code: 0 });
        })
        */
    })
})

router.post('/readMsg', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        // 用户有没有cookie
        return res.json({ code: 1, msg: 'cookie为空' });
    }
    const { from } = req.body;
    Chat.update(
        { from, to: userid },
        { '$set': { read: true } },
        { 'multi': true },
        function (err, doc) {
            if (!err) {
                // doc {n:1,nModified:0,ok:1} 几条数据 修改了几条数据 ok:1表示成功
                return res.json({ code: 0, num: doc.nModified })
            }
            return res.json({ code: 1, msg: '修改失败' })
        })
})

router.post('/update', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        // 用户有没有cookie
        return res.json({ code: 1, msg: 'cookie为空' });
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错了' });
        }
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({ code: 0, data });
    })
})

router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
        if (!doc) {
            return res.json({ code: 1, msg: '用户名或密码错误' });
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0, data: doc });
    })
})

module.exports = router;