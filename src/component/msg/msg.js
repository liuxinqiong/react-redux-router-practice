import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.Component {

    getLast(arr) {
        return arr[arr.length - 1];
    }

    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid = this.props.user._id;
        const users = this.props.chat.users;
        // 按照聊天用户分组 根据chatid
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        })

        const chatList = Object.values(msgGroup).sort((a, b) => {
            // 最新聊天消息在最前面
            const a_last = this.getLast(a);
            const b_last = this.getLast(b);
            return b_last - a_last;
        });

        return (
            <div>

                {chatList.map(v => {
                    const lastItem = this.getLast(v);
                    const targetId = v[0].from === userid ? v[0].to : v[0].from;
                    const unreadNum = v.filter(v => !v.read && v.to === userid).length;
                    if (!users[targetId]) {
                        return null;
                    }
                    console.log(users[targetId]);
                    return (
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${users[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {users[targetId].name}
                                <Brief>{lastItem.content}</Brief>
                            </Item>
                        </List>
                    )
                })}

            </div>
        );
    }
}

export default Msg;