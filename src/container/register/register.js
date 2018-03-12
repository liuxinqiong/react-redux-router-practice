import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom'

@connect(
    state => state.user,
    { register }
)
class Register extends React.Component {
    constructor(props) {
        super(props);
        // 内部数据，不走redux
        this.state = {
            type: 'genius',
            user: '',
            pwd: '',
            repeatpwd: ''
        }
        this.handleRegister = this.handleRegister.bind(this);// 性能较好
    }

    handleRegister() {
        this.props.register(this.state);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <WhiteSpace />
                    <InputItem type='password' onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        onChange={() => this.handleChange('type', 'genius')}
                        checked={this.state.type == 'genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem
                        onChange={() => this.handleChange('type', 'boss')}
                        checked={this.state.type == 'boss'}>
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