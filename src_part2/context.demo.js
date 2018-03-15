import React from 'react';
import PropTypes from 'prop-types'
/**
 * 属性传值存在的问题：多层次传递，繁琐，且即使只进行中转，本身不需要
 * context API：
 *   * 全局，组件里声明，所有子元素可以直接获取
 *   * react认为context不是很好的设计模式，因此必须强类型严格校验
 */
class SideBar extends React.Component {
    render() {
        return (
            <div>
                <p>侧边栏</p>
                {/* user={this.props.user} */}
                <NavBar></NavBar>
            </div>
        )
    }
}

// 无状态组件写法
function test(props, context) {

}

class NavBar extends React.Component {

    static contextTypes = {
        user: PropTypes.string
    }

    render() {
        console.log(this.context);
        return (
            <div>{this.context.user}的导航栏</div>
        )
    }
}

class Page extends React.Component {

    static childContextTypes = {
        user: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = { user: 'sky' }
    }

    getChildContext() {
        return this.state;
    }
    render() {
        return (
            <div>
                <p>我是{this.state.user}</p>
                <SideBar></SideBar>
            </div>
        )
    }
}

export default Page;