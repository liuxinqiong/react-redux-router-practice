import React from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from './index.redux';

// const mapStateToProps = (state) => {
//     return { num: state };
// }

// const actionCreators = { addGun, removeGun, addGunAsync };
// App = connect(mapStateToProps, actionCreators)(App);

@connect(
    // 你要state的什么属性放到props
    state => ({ num: state.counter }),
    // 你要什么方法放到props，会自动dispatch
    { addGun, removeGun, addGunAsync })
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
        return (
            <div>
                <h1>现在有激光枪{num}把</h1>
                <button onClick={addGun}>申请武器</button>
                <button onClick={removeGun}>回收武器</button>
                <button onClick={addGunAsync}>拖两天</button>
            </div>
        );
    }
}

// 自动有了dispatch功能，不在需要store
/* <button onClick={() => store.dispatch(addGun())}>申请武器</button>
<button onClick={() => store.dispatch(removeGun())}>回收武器</button>
<button onClick={() => store.dispatch(addGunAsync())}>拖两天</button> */

export default App;