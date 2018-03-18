import React from 'react';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import Dashboard from './component/dashboard/dashboard';
import { Route, Switch } from 'react-router-dom';

import Chat from './component/chat/chat'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {
        return this.state.hasError ? (<h2>页面出错了</h2>) : (
            <div>
                <AuthRoute></AuthRoute>
                {/*  不加Switch，只要命中了就都会显示 */}
                <Switch>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}

export default App;