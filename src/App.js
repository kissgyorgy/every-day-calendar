import React from "react"
import "./App.css"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { serializeDates, deserializeDates } from "./storage"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
    const storedDays = localStorage.getItem("selectedDays")
    this.state = {
      selectedDays: deserializeDates(storedDays),
    }
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state
    if (selected) {
      const ind = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      )
      selectedDays.splice(ind, 1)
    } else {
      selectedDays.push(day)
    }

    localStorage.setItem("selectedDays", serializeDates(selectedDays))
    this.setState({ selectedDays })
  }

  render() {
    return (
      <div className="App">
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
      </div>
    )
  }
}

export default App
