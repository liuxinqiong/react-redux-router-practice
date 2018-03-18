import React from 'react';
import { connect } from './mini-react-redux';
import { addGun, removeGun, addGunAsync, addTwice } from './index.redux';
import { createSelector } from 'reselect';

// const mapStateToProps = (state) => {
//     return { num: state };
// }

// const actionCreators = { addGun, removeGun, addGunAsync };
// App = connect(mapStateToProps, actionCreators)(App);

// 加了缓存
const numSelector = createSelector(
    state => state.counter,
    // 第二个参数的参数，是第一个参数的返回值
    counter => ({ num: counter * 2 })
)

@connect(
    // 你要state的什么属性放到props
    // state => ({ num: state.counter }),
    state => numSelector(state),
    // 你要什么方法放到props，会自动dispatch
    { addGun, removeGun, addGunAsync, addTwice }
)
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // const store = this.props.store;
        // const num = store.getState();
        const num = this.props.num;
        const addGun = this.props.addGun;
        const removeGun = this.props.removeGun;
        const addGunAsync = this.props.addGunAsync;
        const addTwice = this.props.addTwice;

        return (
            <div>
                <h1>现在有激光枪{num}把</h1>
                <button onClick={addGun}>申请武器</button>
                <button onClick={removeGun}>回收武器</button>
                <button onClick={addGunAsync}>拖两天</button>
                <button onClick={addTwice}>申请两把</button>
            </div>
        );
    }
}

// 自动有了dispatch功能，不在需要store
/* <button onClick={() => store.dispatch(addGun())}>申请武器</button>
<button onClick={() => store.dispatch(removeGun())}>回收武器</button>
<button onClick={() => store.dispatch(addGunAsync())}>拖两天</button> */

export default App;