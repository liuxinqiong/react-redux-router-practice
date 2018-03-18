import React, { Component } from 'react';
import { Map, is } from 'immutable'

let test1 = Map({ name: 'lxq' })
let test2 = Map({ name: 'lxq' })

// 直接比较两个对象用is
console.log(is(test1, test2));
console.log(test1 === test2);

let obj = Map({
  name: 'lxq',
  course: Map({
    name: 'react+redux'
  })
});

let obj1 = obj.set('name', 'sky');

console.log(obj1 === obj);
// 调用get api后可以直接比较
console.log(obj.get('course') === obj1.get('course'))

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      title: 'sky',
      age: '24'
    }
    console.log('app constructor'); // 只执行一次
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      num: this.state.num + 1
    })
    console.log(124);
  }

  render() {
    console.log('app render');
    // 方式一：每一次渲染render，bind的都会执行一次，性能隐患
    // 方式二：每一次渲染render，都会重新生成一个函数
    return (
      <div>
        <h2>App {this.state.num}</h2>
        <button onClick={this.handleClick}>Click0</button>
        <button onClick={this.handleClick.bind(this)}>Click</button>
        <button onClick={() => this.handleClick()}>Click2</button>
        {/* 直接在元素中构建对象传递的也是一样的问题，会导致重新创建对象，非常不推荐，推荐放构造函数或state中 */}
        {/* <Demo style={{ color: 'red' }} name={{ 'react': 'redux' }}></Demo> */}
        {/* 不推荐，传递了多余的值 */}
        {/* <Demo {...this.state}></Demo> */}
        <Demo title={this.state.title}></Demo>

      </div >
    );
  }
}

class Demo extends React.PureComponent {

  //shouldComponentUpdate(nextProps, nextState) {
  // 实际中，挨个比较
  // for(let key in nextProps){

  // }
  // if (this.props.title === nextProps.title) {
  //   return false;
  // }
  // return true;
  //}

  render() {
    console.log('demo render');
    return <h2>I am demo {this.props.title}</h2>
  }
}

export default App;
