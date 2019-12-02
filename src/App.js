import React from "react";
import "./App.css";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

class App extends React.Component {
  state = {
    selectedDays: []
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const ind = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(ind, 1);
    } else {
      selectedDays.push(day);
    }

    this.setState({ selectedDays });
  }

  render() {
    return (
      <div className="App">
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

export default App;
