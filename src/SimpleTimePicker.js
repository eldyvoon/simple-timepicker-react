import React from "react"
import { render } from "react-dom"
import PropTypes from "prop-types"
import "./simpleTimePicker.scss"
import moment from "moment"

import FaClose from "react-icons/lib/fa/close"
import CaretDown from "react-icons/lib/fa/caret-down"
import CaretUp from "react-icons/lib/fa/caret-up"

class SimpleTimePicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectorVisible: this.props.visiblePicker,
      time: this.props.value ? moment(this.props.value, 'hh:mm A') : null,
    }

    this.getHour = this.getHour.bind(this)
    this.getMinute = this.getMinute.bind(this)
    this.getAmPm = this.getAmPm.bind(this)
    this.toggleAmPm = this.toggleAmPm.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.hightlightHourInput = this.hightlightHourInput.bind(this)
    this.handleClearTime = this.handleClearTime.bind(this)
  }

  componentDidUpdate(prevProps, prevState){
    const { time } = this.state

    if(moment(prevState.time).format('hh:mm A') !== moment(time).format('hh:mm A')){
      if(!time){
        this.props.onChange(null)
      }else{
        this.props.onChange(time.format('hh:mm A'))
      }
    }
  }

  getHour() {
    return this.state.time ? this.state.time.format("hh") : null
  }

  getMinute() {
    return this.state.time ? this.state.time.format("mm") : null
  }

  getAmPm() {
    return this.state.time ? this.state.time.format("A") : null
  }

  handleTimeChange(action, type) {
    let { time } = this.state
    const { hourInterval, minuteInterval } = this.props
    
    if(!time) {
      time = moment('12:00 AM', 'hh:mm A')
    }

    let newTime

    if (action === "add" && type === "hour") {
      newTime = moment(time).add(hourInterval, "h")
    } else if (action === "minus" && type === "hour") {
      newTime = moment(time).subtract(hourInterval, "h")
    } else if (action === "add" && type === "minute") {
      newTime = moment(time).add(minuteInterval, "m")
    } else if (action === "minus" && type === "minute") {
      newTime = moment(time).subtract(minuteInterval, "m")
    }

    this.setState({
      time: newTime
    })
  }

  toggleAmPm() {
    let { time } = this.state
    if(!time) {
      time = moment('12:00 AM', 'hh:mm A')
      this.setState({ time })

      return
    }

    const nexttime =
      moment(this.state.time).format("A") === "AM"
        ? moment(this.state.time).add(12, "h")
        : moment(this.state.time).subtract(12, "h")

    this.setState({
      time: nexttime
    })
  }

  handleToggleSelector() {

    if(this.props.visiblePicker) {
      return
    }

    if (!this.state.selectorVisible) {
      document.addEventListener("click", this.handleOutsideClick)
    } else {
      document.removeEventListener("click", this.handleOutsideClick)
    }

    this.setState(prevState => ({
      selectorVisible: !prevState.selectorVisible
    }),()=>{
      const { selectorVisible, time } = this.state
      if(selectorVisible) {
        this.hightlightHourInput()
      }
    })
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return
    }

    this.handleToggleSelector()
  }

  handleClickedPickerInput(e) {
    e.target.select()
  }

  handleKeyDownPickerInput(e, type) {
    let input = e.target.value

    if (!input || isNaN(input)) return

    let { time } = this.state
    if(!time) {
      time = moment('12:00 AM', 'hh:mm A')
    }

    if (type === "hour") {
      this.setState({
        time: moment(time).set({ h: input })
      })
    } else if (type === "minute") {
      this.setState({
        time: moment(time).set({ m: input })
      })
    }
  }

  hightlightHourInput() {
    this.hourInputNode.select()
  }

  handleClearTime() {
    this.setState({
      time: null
    })

    this.hourInputNode.value = ''
    this.minuteInputNode.value = ''
  }

  handleOnKeyDown(e, type) {
    let { time } = this.state
    if(!time) {
      time = moment('12:00 AM', 'hh:mm A')
    }

    //enter key
    if(e.keyCode === 13){
      this.handleToggleSelector()
    }

    //arrow up key
    if(e.keyCode === 38){
      this.handleTimeChange("add", type)
    }

    //arrow down key
    if(e.keyCode === 40) {
      this.handleTimeChange("minus", type)
    }
  }

  render() {
    const { time, selectorVisible } = this.state
    const { placeholderText, fuildWdith, width } = this.props

    const containerWidth = fuildWdith ? '100%' : width

    return (
      <div id="datetime-selector" style={{ width: containerWidth }}>
        <div className="placeholderInput-wrap">
          <input
            className="placeholderInput"
            type="text"
            style={{ width: containerWidth }}
            value={time ? time.format("hh:mm A") : placeholderText}
            defaultValue={placeholderText}
            onClick={() => this.handleToggleSelector()}
          />
          {time && <div className="icon-close-wrapper" onClick={()=>this.handleClearTime()}>
            <FaClose className="icon-close"/>
          </div>}
        </div>
        <div ref={node => this.node = node}
          className={
            "selector-wrap noselect " + (selectorVisible ? "show" : "hide")
          }
          style={{ width: containerWidth }}
        >
          <div className="can_select_wrap">
            <input
              ref={node => this.hourInputNode = node}
              onClick={e => this.handleClickedPickerInput(e)}
              onChange={e => this.handleKeyDownPickerInput(e, "hour")}
              className="can_select"
              type="text"
              value={this.getHour()}
              onKeyDown={e => this.handleOnKeyDown(e, "hour")}
            />
          </div>

          <div className="flex-zero">
            <div className="control-wrap">
              <div
                onClick={() => this.handleTimeChange("add", "hour")}
                className="caret-wrap"
              >
                <CaretUp />
              </div>

              <div
                onClick={() => this.handleTimeChange("minus", "hour")}
                className="caret-wrap"
              >
                <CaretDown />
              </div>
            </div>
          </div>
          <div className="can_select_wrap">
            <input
              ref={node => this.minuteInputNode = node}
              onClick={e => this.handleClickedPickerInput(e)}
              onChange={e => this.handleKeyDownPickerInput(e, "minute")}
              className="can_select"
              type="text"
              value={this.getMinute()}
              onKeyDown={e => this.handleOnKeyDown(e, "minute")}
            />
          </div>

          <div className="flex-zero">
            <div className="control-wrap">
              <div
                onClick={() => this.handleTimeChange("add", "minute")}
                className="caret-wrap"
              >
                <CaretUp />
              </div>

              <div
                onClick={() => this.handleTimeChange("minus", "minute")}
                className="caret-wrap"
              >
                <CaretDown />
              </div>
            </div>
          </div>

          <div className="ampm" onClick={() => this.toggleAmPm()}>
            <span>{this.getAmPm()}</span>
          </div>
        </div>
      </div>
    )
  }
}

SimpleTimePicker.propTypes = {
  width: PropTypes.number,
  fuildWdith: PropTypes.bool,
  placeholderText: PropTypes.string,
  visiblePicker: PropTypes.bool,
  hourInterval: PropTypes.number,
  minuteInterval: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string
}

SimpleTimePicker.defaultProps = {
  width: 200,
  fuildWdith: false,
  placeholderText: '--:--',
  visiblePicker: false,
  hourInterval: 1,
  minuteInterval: 1,
  onChange: function(){},
  value: null
};

export default SimpleTimePicker