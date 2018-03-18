/*
 尽量保持入口文件精简
   * 通过使用babel-node是node支持es6语法
   * 
*/
import express from 'express';
// 引导在react相关之前
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook';
import staticPath from '../build/asset-manifest.json'
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from '../src/app'
import reducers from '../src/reducer'
// React组件 =》 div
import { renderToString, renderToStaticMarkup, renderToNodeStream } from 'react-dom/server'

// const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const model = require('./model');
var favicon = require('serve-favicon')
const Chat = model.getModel('chat');
const User = model.getModel('user');
const app = express();

// work with express
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path')

assethook({
    extensions: ['png'],
    limit: 8000
})

// function App() {
//     return (
//         <div>
//             <p>server render</p>
//             <p>lalalala</p>
//         </div>
//     )
// }

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

app.use(favicon(path.join(path.resolve('build'), 'favicon.ico')))
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/', express.static(path.resolve('build')))

// 后端不需要做路由，直接拦截即可
app.use(function (req, res, next) {
    // console.log(req.url);
    if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
        return next();
    }
    const store = createStore(reducers, compose(
        applyMiddleware(thunk)
    ));

    let context = {};
    // const markup = renderToString(
    //     (<Provider store={store}>
    //         <StaticRouter
    //             location={req.url}
    //             context={context}
    //         >
    //             <App></App>
    //         </StaticRouter>
    //     </Provider>)
    // )

    // 根据req.url 动态生成相关内容
    const obj = {
        '/msg': 'React消息聊天列表',
        '/boss': 'boss查看牛人列表页面',
    };

    res.write(`<!DOCTYPE html>
    <html lang="en">

        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <meta name="keywords" content="React,Redux,Chat,SSR,JOB"/>
        <meta name="author" content="SKY"/>
        <meta name="desciption" content="${obj[req.url] || '测试'}"/>
        <title>JOB App</title>
        <link rel="stylesheet" href="/${staticPath['main.css']}"/>
        </head>

        <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">`);

    const markupStream = renderToNodeStream(
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}
            >
                <App></App>
            </StaticRouter>
        </Provider>)
    )

    markupStream.pipe(res, { end: false })
    markupStream.on('end', () => {
        res.write(`</div>
        <script src="/${staticPath['main.js']}"></script>
        </body>
    </html>`)
        res.end();
    })
    // const pageHtml = `
    //     <!DOCTYPE html>
    //     <html lang="en">

    //         <head>
    //         <meta charset="utf-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    //         <meta name="theme-color" content="#000000">
    //         <meta name="keywords" content="React,Redux,Chat,SSR,JOB"/>
    //         <meta name="author" content="SKY"/>
    //         <meta name="desciption" content="${obj[req.url] || '测试'}"/>
    //         <title>JOB App</title>
    //         <link rel="stylesheet" href="/${staticPath['main.css']}"/>
    //         </head>

    //         <body>
    //         <noscript>
    //             You need to enable JavaScript to run this app.
    //         </noscript>
    //         <div id="root">${markup}</div>
    //         <script src="/${staticPath['main.js']}"></script>
    //         </body>

    //     </html>
    // `
    // css和图片需要额外做钩子处理
    // const htmlRes = renderToString(<App></App>)
    // return res.send(pageHtml);
    // return res.sendFile(path.resolve('build/index.html'));
})
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