import React from 'react';
import ReactDom from 'react-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from './mini-redux'

import thunk from './mini-redux-thunk';
// import thunk from 'redux-thunk';

import arrayThunk from './mini-redux-array';

import { Provider } from './mini-react-redux';
// import { Provider } from 'react-redux';

import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';

import App from './App';
import reducer from './reducer';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';
// import './learn.redux'
// import Page from './context.demo'

// ReactDom.render(<Page></Page>, document.getElementById('root'));

const reduxDevtools = window.devToolsExtension;

// compose(applyMiddleware(thunk), reduxDevtools ? reduxDevtools() : f => f)
const store = createStore(reducer, applyMiddleware(thunk, arrayThunk));

class Test extends React.Component {
    render() {
        console.log(this.props);
        return <h2>测试组件 {this.props.match.params.location}</h2>
    }
}

ReactDom.render(
    (<Provider store={store}>
        <App></App>
        {/* <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter> */}
    </Provider>),
    document.getElementById('root')
);

// const add = (x) => (y) => x + y + 3;
// console.log(add(2)(3));

// const obj = { name: 'sky', type: 'boy' }

// function sayHello(...args) {
//     console.log(...args);
// }

// sayHello(1, 2, 3, 4, 5, 6, 7)

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