import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@connect(
    state => state.chat,
    {}
)
@withRouter
class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.iconStyle = {
            height: 22,
            width: 22
        }
    }

    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const pathname = this.props.location.pathname;
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        className="Item"
                        key={v.path}
                        badge={v.path === '/msg' ? this.props.unread : 0}
                        title={v.text}
                        // icon={{ uri: require(`./img/${v.icon}.png`) }}
                        icon={<img style={this.iconStyle} src={require(`./img/${v.icon}.png`)} alt='' />}
                        // selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
                        selectedIcon={<img style={this.iconStyle} src={require(`./img/${v.icon}-active.png`)} alt='' />}
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}>
                    </TabBar.Item>
                ))}
            </TabBar>
        );
    }
}

export default NavLinkBar;