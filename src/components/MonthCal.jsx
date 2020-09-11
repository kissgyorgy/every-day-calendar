import React, { useState, useContext } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { loadSelectedDays, toggleSelectedDay } from "../storage"
import { SettingsContext } from "../context"
import "./MonthCal.css"

function MonthCal({ audio }) {
  const settings = useContext(SettingsContext)

  const [selectedDays, setSelectedDays] = useState(() => loadSelectedDays())

  const handleDayClick = (day, { selected }) => {
    const lastSelectedDay = selectedDays[selectedDays.length - 1]
    const sameDay = DateUtils.isSameDay(lastSelectedDay, day)
    audio.play(!selected && !sameDay)
    const newSelectedDays = toggleSelectedDay(day)
    setSelectedDays(newSelectedDays)
  }

  return (
    <div className="container">
      <div className="App">
        <DayPicker
          onDayClick={handleDayClick}
          modifiers={{ selected: selectedDays }}
          modifiersStyles={{
            selected: { backgroundColor: settings.selectedColor },
          }}
          firstDayOfWeek={settings.firstDayOfWeek}
        />
        {settings.Component}
      </div>
    </div>
  )
}

export default MonthCal
