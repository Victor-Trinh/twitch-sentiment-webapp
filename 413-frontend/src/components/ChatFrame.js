import React, { Component } from 'react'

export default class ChatFrame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: `https://www.twitch.tv/embed/${this.props.channel}/chat?parent=${this.props.channel}`
        }
    }

    render() {
        return (
            <iframe src={this.state.url}
                height="500px"
                width="600px">
            </iframe>
        )
    }
}
