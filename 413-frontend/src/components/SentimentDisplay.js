import { CircularProgress } from '@mui/material'
import React, { Component } from 'react'
import ChatMonitor from '../ChatMonitor'

export default class SentimentDisplay extends Component {
  constructor(props){
    super(props)
    this.state = {
      msg_buffer_size: 5,
      channel: this.props.channel,
      sentiment: null
    }
  }

  render() {
    if (this.state.channel && !this.state.sentiment){
      const chat_monitor = this.state.channel ? new ChatMonitor(this.state.channel, this.state.msg_buffer_size) : null
      console.log(`Attempting to start monitor for ${this.state.channel}`);
      chat_monitor.monitor_chat((sentiment)=>this.setState({sentiment: sentiment}))
    } 

    if (this.state.sentiment) {
      return <div>
          <p>
            Re-inferring sentiment every {this.state.msg_buffer_size} messages...<br/>
            Current Sentiment: {this.state.sentiment} <br/>
            0-0.5: Negative <br/>
            0.5-1.5: Neutral <br/>
            1.5-2: Positive <br/>
            </p>
        </div>
    } else {
      return <div>
          <p>Inferring Sentiment...</p>
          <CircularProgress />
        </div>
    }
  }
}
