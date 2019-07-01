
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from './mini-redux'

// connect 负责链接组件，给到redux里的数据到组件的属性里
/**
 * 1. 负责接受一个组件，把state里的一些数据放进去，返回一个组件
 * 2. 数据变化的时候，能够通知组件
 * 3. params:
 *      mapStateToProps, 函数
 *      mapDispatchToProps 函数或对象
 */
// 双层箭头函数
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context) {
            super(props);
            this.state = {
                props: {}
            };
        }
        componentDidMount() {
            const { store } = this.context;
            store.subscribe(() => this.update());
            this.update();
        }

        update() {
            const { store } = this.context;
            const stateProps = mapStateToProps(store.getState());
            // 方法不能直接给，因为需要dispatch
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
            // 直接执行addGun没有意义
            // 要执行 addGun =()=>store.dispatch(addGun())才有意义，其实就是用dispatch把action creator包了一层
            // console.log(this.state.props);
            this.setState({
                props: {
                    ...this.state.props,//本身的props
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }

        render() {
            return <WrapComponent {...this.state.props}></WrapComponent>
        }
    }
}

// Provider，把store放到context，所有的子元素可以直接取打破store
export class Provider extends React.Component {
    static childContextTypes = {
        store: PropTypes.object
    }
    getChildContext() {
        return { store: this.store }
    }
    constructor(props, context) {
        super(props, context);
        this.store = props.store;
    }

    render() {
        return this.props.children
    }
}