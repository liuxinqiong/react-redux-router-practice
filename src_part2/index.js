import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';

import App from './App';
import reducer from './reducer';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';

const reduxDevtools = window.devToolsExtension;

const store = createStore(reducer, compose(applyMiddleware(thunk), reduxDevtools ? reduxDevtools() : f => f));

console.log(store.getState());

class Test extends React.Component {
    render() {
        console.log(this.props);
        return <h2>测试组件 {this.props.match.params.location}</h2>
    }
}

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

// function render() {
//     ReactDom.render(<App store={store} addGun={addGun} removeGun={removeGun} addGunAsync={addGunAsync} />, document.getElementById('root'));
// }
//render();

//store.subscribe(render);


/*
import { createStore } from 'redux';


// 通过reducer建立：根据老的state和action，生成新的state
function counter(state = 0, action) {
    switch (action.type) {
        case '加激光枪':
            return state + 1;
        case '减激光枪':
            return state - 1;
        default:
            return 10;
    }
}

// 1. 新建store
const store = createStore(counter);

const init = store.getState();

console.log(init);

// 每次状态的变化都会触发
function listener() {
    const current = store.getState();
    console.log(`现在有机关枪${current}把`);
}

store.subscribe(listener)

// 派发事件，传递action
store.dispatch({ type: '加激光枪' });

store.dispatch({ type: '加激光枪' });

store.dispatch({ type: '减激光枪' });
*/