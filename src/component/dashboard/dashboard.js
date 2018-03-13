import React from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import NavLinkBar from '../navlink/navlink';

import { Switch, Route } from 'react-router-dom';

import Boss from '../../component/boss/boss';

function Genius() {
    return <h1>Genius index</h1>
}

function Msg() {
    return <h1>Msg index</h1>
}

function User() {
    return <h1>User index</h1>
}

@connect(
    state => state,

)
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const user = this.props.user;
        const pathname = this.props.location.pathname;
        const navList = [
            { path: '/boss', text: '牛人', icon: 'boss', title: '牛人列表', component: Boss, hide: user.type === 'genius' },
            { path: '/genius', text: 'boss', icon: 'job', title: 'BOSS列表', component: Genius, hide: user.type === 'boss' },
            { path: '/msg', text: '消息', icon: 'msg', title: '消息列表', component: Msg },
            { path: '/me', text: '我', icon: 'user', title: '个人中心', component: User }
        ];
        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
                <div stype={{ marginTop: 45 }}>
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