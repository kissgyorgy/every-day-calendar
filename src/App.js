import React from "react";
import "./App.css";
import DayPicker from "react-day-picker";
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
    let newSelectedDays = this.state.selectedDays;
    if (selected) {
      const ind = newSelectedDays.findIndex(e => e.getTime() === day.getTime());
      newSelectedDays.splice(ind, 1);
    } else {
      newSelectedDays = newSelectedDays.concat(day);
    }

    this.setState({ selectedDays: newSelectedDays });
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
