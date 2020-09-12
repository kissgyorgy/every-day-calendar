import React, { useState, useContext } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { loadSelectedDays, toggleSelectedDay } from "../storage"
import { SettingsContext } from "../context"

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

  const modifiersStyles = {
    selected: { backgroundColor: settings.selectedColor },
  }

  return (
    <div className="mt-4">
      <DayPicker
        className="flex justify-center text-xl"
        onDayClick={handleDayClick}
        modifiers={{ selected: selectedDays }}
        modifiersStyles={modifiersStyles}
        firstDayOfWeek={settings.firstDayOfWeek}
      />
      {settings.Component}
    </div>
  )
}

export default MonthCal
