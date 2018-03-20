import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
import QueueAnim from 'rc-queue-anim'

@connect(
    state => state,
    { sendMsg, getMsgList, recvMsg, readMsg }
)
class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        !this.props.chat.list_status && this.props.getMsgList();
        !this.props.chat.recv_status && this.props.recvMsg();
    }

    componentWillUnmount() {
        // 目标id
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }

    fixCarousel() {
        setTimeout(() => window.dispatchEvent(new Event('resize')));
    }

    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({
            text: '',
            showEmoji: false
        })
    }

    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)// 防止连续多个空格
            .map(v => ({ text: v }))
        const userid = this.props.match.params.user;
        const users = this.props.chat.users;
        const Item = List.Item;
        // 组件不用渲染
        if (!users[userid]) {
            return null;
        }
        const chatid = getChatId(userid, this.props.user._id);
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id='chat-page'>
                <NavBar
                    className='fixed-header'
                    mode='dark'
                    icon={<Icon type='left' />}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar>
                <div style={{ marginTop: 45, marginBottom: 45 }}>
                    <List >
                        {/* <QueueAnim delay={100}> */}
                        {chatmsgs.map(v => {
                            // 消息头像仅和from挂钩
                            const avatar = require(`../img/${users[v.from].avatar}.png`)
                            return v.from === userid ? (
                                <Item
                                    key={v._id}
                                    thumb={avatar}
                                    wrap={true}
                                >{v.content}</Item>
                            ) : (
                                    <Item
                                        key={v._id}
                                        wrap={true}
                                        extra={<img src={avatar} alt='' />}
                                        className='chat-me'>{v.content}</Item>
                                );
                        })
                        }
                        {/* </QueueAnim> */}
                    </List>
                </div>
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => this.setState({ text: v })}
                            extra={
                                <div>
                                    <span
                                        role='img'
                                        aria-label=''
                                        style={{ marginRight: 15 }}
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel();
                                        }}
                                    >😃</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji ? <Grid
                        onClick={el => {
                            this.setState({
                                text: this.state.text + el.text
                            })
                        }}
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                    /> : null}
                </div >
            </div>

        )
    }
}

export default Chat