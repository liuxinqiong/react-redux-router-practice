import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        };
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    selectAvatar(name) {
        this.setState({
            avatar: name
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar
                    mode="dark"
                >BOSS完善信息页面</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem onChange={v => this.handleChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={v => this.handleChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={v => this.handleChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem
                    onChange={v => this.handleChange('desc', v)}
                    rows={3}
                    autoHeight
                    title='职位要求'>
                </TextareaItem>
                <Button
                    onClick={() => this.props.update(this.state)}
                    type='primary'
                >保存</Button>
            </div>
        );
    }
}

export default BossInfo;