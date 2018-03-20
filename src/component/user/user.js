import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, ActionSheet } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
    state => state.user,
    { logoutSubmit }
)
class User extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout = () => {

        const BUTTONS = ['确认', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            destructiveButtonIndex: BUTTONS.length - 2,
            title: '注销',
            message: '确认退出当前账号吗？',
            maskClosable: true
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    browserCookie.erase('userid');
                    this.props.logoutSubmit();
                    this.props.history.push('/login');
                    break;
                default:
                    console.log('取消啦');
                    break;
            }
        });

        // 奇怪问题，线上事件不响应
        // const alert = Modal.alert;
        // alert('注销', '确认退出当前账号吗？', [
        //     { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        //     {
        //         text: '确认', onPress: () => {
        //             browserCookie.erase('userid');
        //             this.props.logoutSubmit();
        //             this.props.history.push('/login');
        //         }
        //     },
        // ]);
    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user ? (
            < div >
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{ width: 50 }} alt='' />}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div >
        ) : <div>loading</div>;
    }
}

export default User;