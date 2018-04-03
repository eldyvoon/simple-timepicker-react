import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SimpleTimePicker from './SimpleTimePicker'

import './index.scss'

class App extends Component {
  constructor() {
    super()

    this.handleTimeChanged = this.handleTimeChanged.bind(this)
    this.state = {
      selectedTime: '10:00 AM'
    }
  }

  handleTimeChanged(time) {
    this.setState({selectedTime: time})
  }

  render() {
    return (
      <div>
        <h1>Simple Time Picker Examples</h1>
        <h3>Empty state</h3>
        <SimpleTimePicker />

        <br />

        <h3>Filled</h3>
        <SimpleTimePicker 
          value={this.state.selectedTime}
          onChange={time => this.handleTimeChanged(time)}
        />
        <p>
          Selected Time: 
          <strong>{this.state.selectedTime}</strong>
        </p>

        <br />

        <h3>
          Options
        </h3>
        <table>
          <thead>
            <tr>
              <th>prop</th>
              <th>type</th>
              <th>default value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>width</td>
              <td>Number</td>
              <td>200</td>
            </tr>
            <tr>
              <td>fluidWidth</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>placeholderText</td>
              <td>String</td>
              <td>–:--</td>
            </tr>
            <tr>
              <td>hourInterval</td>
              <td>Number</td>
              <td>1</td>
            </tr>
            <tr>
              <td>minuteInterval</td>
              <td>Number</td>
              <td>1</td>
            </tr>
            <tr>
              <td>visiblePicker</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>Func</td>
              <td />
            </tr>
            <tr>
              <td>value</td>
              <td>String</td>
              <td>null</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>Boolean</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>

        <br />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))