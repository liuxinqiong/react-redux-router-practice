import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import { getMsgList, recvMsg } from '../../redux/chat.redux'
import QueueAnim from 'rc-queue-anim'

@connect(
    state => state,
    { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        !this.props.chat.list_status && this.props.getMsgList();
        !this.props.chat.recv_status && this.props.recvMsg();
    }

    componentWillUnmount() {
        console.log('Dashboard Unmount');
    }

    render() {
        const user = this.props.user;
        if (!user.type) {
            return null;
        }
        const pathname = this.props.location.pathname;
        // 没有默认页面，不在几者之中会报错，不存在跳转到msg页面
        const navList = [
            { path: '/boss', text: '牛人', icon: 'boss', title: '牛人列表', component: Boss, hide: user.type === 'genius' },
            { path: '/genius', text: 'boss', icon: 'job', title: 'BOSS列表', component: Genius, hide: user.type === 'boss' },
            { path: '/msg', text: '消息', icon: 'msg', title: '消息列表', component: Msg },
            { path: '/me', text: '我', icon: 'user', title: '个人中心', component: User },
        ];
        const page = navList.find(v => v.path === pathname)
        // 让动画生效，只渲染一个Route，根据当前的path决定组件
        return (
            page ? (
                <div>
                    <NavBar className='fixed-header' mode='dark'>{page.title}</NavBar>
                    <div style={{ marginTop: 45 }}>
                        <QueueAnim type='scaleX' duration={800}>
                            <Route key={page.path} path={page.path} component={page.component}></Route>
                            {/* <Switch>

                            {navList.map(v => (
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))}

                        </Switch> */}
                        </QueueAnim>
                    </div>
                    <NavLinkBar data={navList}></NavLinkBar>
                </div>) : <Redirect to='/msg'></Redirect>
        )
    }
}

export default Dashboard;