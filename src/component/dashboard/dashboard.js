import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        // 不然导致多次绑定多个socket
        // todo：其实还是有问题的，如果初始为空呢
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg();
        }
    }

    render() {
        const user = this.props.user;
        const pathname = this.props.location.pathname;
        // todo:没有默认页面，不在几者之中会报错
        const navList = [
            { path: '/boss', text: '牛人', icon: 'boss', title: '牛人列表', component: Boss, hide: user.type === 'genius' },
            { path: '/genius', text: 'boss', icon: 'job', title: 'BOSS列表', component: Genius, hide: user.type === 'boss' },
            { path: '/msg', text: '消息', icon: 'msg', title: '消息列表', component: Msg },
            { path: '/me', text: '我', icon: 'user', title: '个人中心', component: User }
        ];
        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard;