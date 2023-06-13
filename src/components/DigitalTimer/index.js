// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimeRun: false,
  timeElapsedInSec: 0,
  timeInMin: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecreaseTimeMin = () => {
    const {timeInMin} = this.state

    if (timeInMin > 1) {
      this.setState(prevState => ({
        timeInMin: prevState.timeInMin - 1,
      }))
    }
  }

  onIncreaseTimeMin = () =>
    this.setState(prevState => ({
      timeInMin: prevState.timeInMin + 1,
    }))

  renderTimerLimit = () => {
    const {timeInMin, timeElapsedInSec} = this.state
    const isBtnDisabled = timeElapsedInSec > 0

    return (
      <div className="timer-controller">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit">
          <button
            className="controller-btn"
            disabled={isBtnDisabled}
            onClick={this.onDecreaseTimeMin}
            type="button"
          >
            -
          </button>
          <div className="limit-label-container">
            <p className="limit-value">{timeInMin}</p>
          </div>
          <button
            className="controller-btn"
            disabled={isBtnDisabled}
            onClick={this.onIncreaseTimeMin}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetBtn = () => {
    this.clearTimeInterval()
    this.setState(initialState)
  }

  increaseTimeElapsedSec = () => {
    const {timeInMin, timeElapsedInSec} = this.state
    const isTimerCompleted = timeElapsedInSec === timeInMin * 60

    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimeRun: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSec: prevState.timeElapsedInSec + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {isTimeRun, timeElapsedInSec, timeInMin} = this.state

    const isTimerCompleted = timeElapsedInSec === timeInMin * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSec: 0})
    }
    if (isTimeRun) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeElapsedSec, 1000)
    }
    this.setState(prevState => ({isTimeRun: !prevState.isTimeRun}))
  }

  renderTimeController = () => {
    const {isTimeRun} = this.state
    const startOrPauseImage = isTimeRun
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAlt = isTimeRun ? 'pause icon' : 'play icon'

    return (
      <div className="time-controller">
        <button
          className="time-control-btn"
          onClick={this.onStartOrPause}
          type="button"
        >
          <img
            src={startOrPauseImage}
            alt={startOrPauseAlt}
            className="time-control-icon"
          />
          <p className="time-control-label">{isTimeRun ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="time-control-btn"
          onClick={this.onResetBtn}
          type="button"
        >
          <img
            alt="reset icon"
            className="time-control-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-para">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecTime = () => {
    const {timeInMin, timeElapsedInSec} = this.state
    const totalRemainSec = timeInMin * 60 - timeElapsedInSec
    const minutes = Math.floor(totalRemainSec / 60)
    const sec = Math.floor(totalRemainSec % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = sec > 9 ? sec : `0${sec}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  render() {
    const {isTimeRun} = this.state
    const labelText = isTimeRun ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="head">Digital Timer</h1>
        <div className="digital-container">
          <div className="timer-display">
            <div className="elapsed-con">
              <h1 className="elapsed-time">{this.getElapsedSecTime()}</h1>
              <p className="timer">{labelText}</p>
            </div>
          </div>
          <div className="controls-con">
            {this.renderTimeController()}
            {this.renderTimerLimit()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
