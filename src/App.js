import React from "react"
import "./App.css"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { serializeDates, deserializeDates } from "./storage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons"

class App extends React.Component {
  audio = new Audio("ding.mp3")

  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.toggleMute = this.toggleMute.bind(this)

    const storedDays = localStorage.getItem("selectedDays")
    this.state = {
      selectedDays: deserializeDates(storedDays),
      muted: false,
    }
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state
    if (selected) {
      const lastSelectedDay = selectedDays[selectedDays.length - 1]
      if (DateUtils.isSameDay(lastSelectedDay, day)) {
        this.audio.pause()
        this.audio.currentTime = 0
      }

      const ind = selectedDays.findIndex(selectedDay =>
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
    this.audio.muted = !this.state.muted
    this.setState({ muted: !this.state.muted })
  }

  render() {
    const icon = this.state.muted ? faVolumeMute : faVolumeUp

    return (
      <div className="App">
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />

        <FontAwesomeIcon
          icon={icon}
          onClick={this.toggleMute}
          className="bottom-right"
        />
      </div>
    )
  }
}

export default App
