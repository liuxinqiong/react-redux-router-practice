import React from 'react'

export default function WithForm(Comp) {
    return class WrapperComp extends React.Component {

        constructor(props) {
            super(props);
            this.state = {};
            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(key, val) {
            this.setState({
                [key]: val
            });
        }

        render() {
            // 属性穿透
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}