import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timeLeft: 25 * 60,
    isStartButtonClicked: false,
    defaultPage: true,
    timerLimitValue: 25,
  }

  StartNdPauseClicked = () => {
    const {isStartButtonClicked} = this.state
    this.setState(prevState => ({
      isStartButtonClicked: !prevState.isStartButtonClicked,
      defaultPage: false,
    }))

    if (!isStartButtonClicked) {
      this.timeIntervalUniqueId = setInterval(() => {
        this.setState(prevState => ({timeLeft: prevState.timeLeft - 1}))
      }, 1000)
      console.log(this.timeIntervalUniqueId)
    }
    if (isStartButtonClicked) {
      clearInterval(this.timeIntervalUniqueId)
    }
  }

  decrementClicked = () => {
    const {defaultPage, timerLimitValue} = this.state
    if (defaultPage && timerLimitValue > 1) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue - 1,
        timeLeft: prevState.timeLeft - 60,
      }))
    }
  }

  incrementClicked = () => {
    const {defaultPage} = this.state
    if (defaultPage) {
      this.setState(prevState => ({
        timerLimitValue: prevState.timerLimitValue + 1,
        timeLeft: prevState.timeLeft + 60,
      }))
    }
  }

  resetBtnClicked = () => {
    clearInterval(this.timeIntervalUniqueId)
    this.setState({
      timeLeft: 25 * 60,
      isStartButtonClicked: false,
      defaultPage: true,
      timerLimitValue: 25,
    })
  }

  render() {
    const {timeLeft, isStartButtonClicked, timerLimitValue} = this.state
    console.log(timeLeft)
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const startOrPause = isStartButtonClicked
      ? {
          imgUrl: 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
          altText: 'pause icon',
          text: 'Pause',
          timerStatus: 'Running',
        }
      : {
          imgUrl: 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
          altText: 'play icon',
          text: 'Start',
          timerStatus: 'Paused',
        }
    const {imgUrl, altText, text, timerStatus} = startOrPause

    if (minutes === 0 && seconds === 0) {
      this.resetBtnClicked()
    }

    return (
      <div className="bg">
        <h1 className="heading">Digital Timer</h1>
        <div className="bgImageMain">
          <div className="bgImage">
            <div className="whiteColoredBg">
              <h1>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p>{timerStatus}</p>
            </div>
          </div>

          <div className="clockContainer">
            <div className="startAndPauseContainer">
              <div className="startContainer">
                <button
                  type="button"
                  className="btnStartNdPause"
                  onClick={this.StartNdPauseClicked}
                >
                  <img src={imgUrl} alt={altText} className="imageIcon" />
                  {text}
                </button>
              </div>
              <div className="resetContainer">
                <button
                  type="button"
                  className="btnStartNdPause"
                  onClick={this.resetBtnClicked}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="imageIcon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="increaseDecreaseContainer">
              <button
                type="button"
                className="incrementNdDecrement"
                onClick={this.decrementClicked}
              >
                -
              </button>
              <div className="numberContainer">
                <p>
                  {timerLimitValue < 10
                    ? `0${timerLimitValue}`
                    : timerLimitValue}
                </p>
              </div>
              <button
                type="button"
                className="incrementNdDecrement"
                onClick={this.incrementClicked}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
