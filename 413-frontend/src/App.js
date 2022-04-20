import './App.css';
import UserInput from './components/UserInput';
import { AppBar, Typography } from '@mui/material';

import React, { Component } from 'react'
import SentimentDisplay from './components/SentimentDisplay';
import ChatFrame from './components/ChatFrame';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      channel: null
    }
    this.state.channel=null
  }

  render() {
    return (
      <div>
        <AppBar position="static">
            <Typography variant="h6" color="inherit" component="div">
              Twitch Sentiment Analysis Demo: {this.state.channel}
              </Typography>
        </AppBar>

        
        {!this.state.channel ? <UserInput updateChannel={(newChannel)=>this.setState({channel:newChannel})}/> : null}
        {this.state.channel ? <ChatFrame channel={this.state.channel}/> : null}
        {this.state.channel ? <SentimentDisplay channel={this.state.channel}/> : null}
      </div>
    )
  }
}
