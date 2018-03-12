// 合并reducer，每个reducer都有state
// 合并所有的reducer并且返回
import { combineReducers } from 'redux';
import { counter } from './index.redux';
import { auth } from './Auth.redux';

// 传递是一个对象
export default combineReducers({ counter, auth });