const express = require('express');
const router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const md5Pwd = require('./util').md5Pwd;
const _filter = { pwd: 0, __v: 0 };

router.get('/info', function (req, res) {
    const { userid } = req.cookies;
    if (!userid) {
        // 用户有没有cookie
        res.json({ code: 1 });
    }
    User.findOne({ _id: userid }, _filter, function (err, doc) {
        if (err) {
            return res.json({ code: 0, msg: '服务器出错啦' });
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
        res.json({ code: 0, data: doc });
    })
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

router.post('/update', function (req, res) {
    const userid = req.cookies.userid;
    if (!userid) {
        return res.dumps({ code: 1 });
    }
    const body = req.body;
    User.findByIdAndUpdate(userid, body, function (err, doc) {
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