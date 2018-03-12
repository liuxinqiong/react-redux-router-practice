import React, { Component } from 'react';
import { Button, List } from 'antd-mobile';

class App extends Component {
  render() {
    const boss = '李云龙';
    return (
      <div>
        <h2>独立团，团长是{boss}</h2>
        <一营 老大='张大彪' />
        <骑兵连 老大='孙大圣' />
      </div>
    );
  }
}

class 一营 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solders: ['胡子', '柱子', '王根生']
    }
    // this.addSolder = this.addSolder.bind(this);
  }

  componentWillMount() {
    console.log('组件马上加载啦');
  }

  componentDidMount() {
    console.log('组件已经加载啦');
  }

  addSolder() {
    this.setState({
      solders: [...this.state.solders, '新兵蛋子' + Math.random()]
    });
  }

  render() {
    console.log('组件正在加载');
    return (
      <div>
        <h2>一营营长，{this.props.老大}</h2>
        <Button type='primary' onClick={() => this.addSolder()}>新兵入伍</Button>
        <List renderHeader={() => '士兵列表'}>
          {this.state.solders.map(v => {
            return <List.Item key={v}>{v}</List.Item>
          })}
        </List>
      </div>
    )

  }
}

function 骑兵连(props) {
  return <h2>骑兵连连长{props.老大}</h2>
}

export default App;
