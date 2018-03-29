import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SimpleTimePicker from './SimpleTimePicker'

class App extends Component {
  render() {
    return <div>
      <h1>Simple Time Picker</h1>
      <SimpleTimePicker />
    </div>
  }
}

ReactDOM.render(<App />, 
  document.getElementById('root'))
