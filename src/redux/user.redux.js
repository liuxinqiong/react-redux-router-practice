import axios from 'axios';
import { getRedirectPath } from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const TO_REGISTER = 'TO_REGISTER'

const initState = {
    msg: '',
    user: '',
    type: '',
    redirectTo: ''
}

// reducer
export function user(state = initState, action) {

    switch (action.type) {
        // case REGISTER_SUCCESS:
        //     return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        // case LOGIN_SUCCESS:
        //     return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload }
        case LOAD_DATA:
            return { ...state, ...action.payload };
        case LOGOUT:
            return { ...initState };
        case TO_REGISTER:
            return { ...initState, redirectTo: '/register' }
        default:
            return state;
    }
}

function errorMsg(msg) {
    // 此时可以简写msg，但放在最前，约定俗成的东西
    return { msg, type: ERROR_MSG };
}

function authSuccess(obj) {
    // 过滤pwd
    const { pwd, ...data } = obj;
    return { type: AUTH_SUCCESS, payload: data };
}

// function registerSuccess(data) {
//     return { type: REGISTER_SUCCESS, payload: data };
// }

// function loginSuccess(data) {
//     return { type: LOGIN_SUCCESS, payload: data }
// }

export function toRegister() {
    return { type: TO_REGISTER }
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名和密码必须输入');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码和确认密码不同');
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo };
}

export function logoutSubmit() {
    return { type: LOGOUT }
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户密码必须输入');
    }

    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }

}