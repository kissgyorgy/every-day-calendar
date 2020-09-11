import React from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { CirclePicker } from "react-color"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVolumeUp,
  faVolumeMute,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons"
import { serializeDates, deserializeDates } from "../storage"
import "./MonthCal.css"

const pickableColors = [
  "#4A90E2",
  "#e91e63",
  "#ff9800",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#009688",
  "#795548",
]

const monday = 1

class MonthCal extends React.Component {
  audio = new Audio("ding.mp3")

  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.toggleMute = this.toggleMute.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.hideColorPicker = this.hideColorPicker.bind(this)

    const storedDays = localStorage.getItem("selectedDays")
    const storedMuted = localStorage.getItem("muted")
    const storedColor = localStorage.getItem("selectedColor")

    this.state = {
      selectedDays: deserializeDates(storedDays),
      muted: JSON.parse(storedMuted) || false,
      showColorPicker: false,
      selectedColor: storedColor || "#2196f3",
    }
    this.audio.muted = this.state.muted
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state
    if (selected) {
      const lastSelectedDay = selectedDays[selectedDays.length - 1]
      if (DateUtils.isSameDay(lastSelectedDay, day)) {
        this.audio.pause()
        this.audio.currentTime = 0
      }

      const ind = selectedDays.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(ind, 1)
    } else {
      selectedDays.push(day)
      this.audio.currentTime = 0
      this.audio.play()
    }

    localStorage.setItem("selectedDays", serializeDates(selectedDays))
    this.setState({ selectedDays })
  }

  toggleMute() {
    const toggled = !this.state.muted
    this.audio.muted = toggled
    this.setState({ muted: toggled })
    localStorage.setItem("muted", JSON.stringify(toggled))
  }

  changeColor(color, event) {
    this.setState({ selectedColor: color.hex, showColorPicker: false })
    localStorage.setItem("selectedColor", color.hex)
  }

  hideColorPicker(event) {
    if (this.state.showColorPicker) {
      this.setState({ showColorPicker: false })
    }
  }

  render() {
    const icon = this.state.muted ? faVolumeMute : faVolumeUp
    const mutedStyle = this.state.muted ? { color: "grey" } : {}

    return (
      <div className="container" onClick={this.hideColorPicker}>
        <div className="App">
          <DayPicker
            onDayClick={this.handleDayClick}
            modifiers={{ selected: this.state.selectedDays }}
            modifiersStyles={{
              selected: { backgroundColor: this.state.selectedColor },
            }}
            firstDayOfWeek={monday}
          />

          <div className="settings">
            {!this.state.showColorPicker && (
              <button
                style={{ backgroundColor: this.state.selectedColor }}
                onClick={() => this.setState({ showColorPicker: true })}
                className="picker-toggler"
              ></button>
            )}

            {this.state.showColorPicker && (
              <div className="color-picker">
                <FontAwesomeIcon
                  icon={faHandPointRight}
                  className="hand-right"
                />
                <CirclePicker
                  colors={pickableColors}
                  circleSize={20}
                  circleSpacing={5}
                  onChangeComplete={this.changeColor}
                  width="200px"
                />
              </div>
            )}

            <FontAwesomeIcon
              icon={icon}
              onClick={this.toggleMute}
              className="mute-icon"
              style={mutedStyle}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MonthCal
