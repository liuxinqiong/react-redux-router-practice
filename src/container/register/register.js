import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom'
import WithForm from '../../component/withform/withform'

@connect(
    state => state.user,
    { register }
)
@WithForm
class Register extends React.Component {
    constructor(props) {
        super(props);
        // 内部数据，不走redux
        // this.state = {
        //     type: 'genius',
        //     user: '',
        //     pwd: '',
        //     repeatpwd: ''
        // }
        this.handleRegister = this.handleRegister.bind(this);// 性能较好
    }

    componentDidMount() {
        this.props.handleChange('type', 'genius');
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        const pathname = this.props.location.pathname;
        return (
            <div>
                {/* fixed
                    * redirectTo用来实现注册成功的跳转
                    * 退出登录开始注册，无法跳转注册页面，因为立马又跳转login页面了
                */}
                {this.props.redirectTo && this.props.redirectTo !== pathname ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        onChange={() => this.props.handleChange('type', 'genius')}
                        checked={this.props.state.type === 'genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem
                        onChange={() => this.props.handleChange('type', 'boss')}
                        checked={this.props.state.type === 'boss'}>
                        老板
                    </RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}

export default Register;