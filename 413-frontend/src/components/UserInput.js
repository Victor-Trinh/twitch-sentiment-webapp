import React, { Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

export default class UserInput extends Component {
  constructor(props){
    super()
    this.state={}
  }

  render() {
    return (
      <div>
        <TextField id="outlined-basic" label="Channel" variant="outlined" required={true} onChange={(event)=>this.setState({inputChannel:event.target.value})}/>
        <Button variant="contained" onClick={()=>this.props.updateChannel(this.state.inputChannel)}>Analyse Sentiment</Button>
      </div>
    )
  }
}

