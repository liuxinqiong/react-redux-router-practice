import axios from 'axios';
import io from 'socket.io-client';
import { ws } from '../config';

// 由于存在跨域，所以写上url地址
const socket = io(ws.url);

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
// 标识已读
const MSG_READ = 'MSG_READ';
// 建立监听状态
const MSG_RECV_STATUS = 'MSG_RECV_STATUS';

const initState = {
    chatmsg: [],
    users: {},
    unread: 0,
    status: false
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length }
        case MSG_RECV:
            // 服务端写的是广播 因此接受消息也需要过滤
            const n = action.payload.to === action.userid ? 1 : 0;
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n }
        case MSG_READ:
            const { from, num } = action.payload;
            return {
                ...state, chatmsg: state.chatmsg.map(v => ({ ...v, read: from === v.from ? true : v.read })), unread: state.unread - num
            }
        case MSG_RECV_STATUS:
            return { ...state, status: true };
        default: return state;
    }
}

function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: { msgs, users, userid } }

}

function msgRecv(msg, userid) {
    return { userid, type: MSG_RECV, payload: msg }
}

export function recvMsg() {

    return (dispatch, getState) => {
        // 是否建立监听状态，防止建立多个socket连接
        const status = getState().chat.status;
        if (!status) {
            dispatch({ type: MSG_RECV_STATUS });
            socket.on('recvmsg', function (data) {
                const userid = getState().user._id;
                dispatch(msgRecv(data, userid));
            });
        }
    }
}

function msgRead({ from, userid, num }) {
    return { type: MSG_READ, payload: { from, userid, num } }
}

export function readMsg(from) {
    return async (dispatch, getState) => {
        const res = await axios.post('/user/readMsg', { from })
        // .then(res => {
        const userid = getState().user._id;
        if (res.status === 200 && res.data.code === 0) {
            dispatch(msgRead({ from, userid, num: res.data.num }))
        }
        // })
    }
}

export function sendMsg({ from, to, msg }) {
    // must return object || function
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg });
    }
}

export function getMsgList() {
    // getState可以得到redux下所有的state
    return (dispatch, getState) => {
        axios.get('/user/getMsgList')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid));
                }
            })
    }
}