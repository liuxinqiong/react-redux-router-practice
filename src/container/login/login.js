import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { login, toRegister } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import WithForm from '../../component/withform/withform'

// function Hello() {
//     return <h2>hello组件</h2>
// }

// function wrapperHello(Comp) {
//     class WrapComp extends Comp {
//         componentDidMount() {
//             console.log('新增生命周期');
//         }
//         return() {
//             return <Comp></Comp>
//         }
//     }
//     // class WrapComp extends React.Component {
//     //     render() {
//     //         return (
//     //             <div>
//     //                 <p>高阶组件特有的元素</p>
//     //                 <Comp {...this.props}></Comp>
//     //             </div>
//     //         );
//     //     }
//     // }
//     return WrapComp;
// }

@connect(
    state => state.user,
    { login, toRegister }
)
@WithForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        console.log('原本生命周期')
    }
    register() {
        // 路由组件，有路由相关的属性
        console.log(this.props);
        //this.props.history.push('/register');
        this.props.toRegister();
    }

    handleLogin() {
        this.props.login(this.props.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
                        <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Login;