import React, { useState } from "react"
import MonthCal from "./components/MonthCal"
import SimoneCal from "./components/SimoneCal"
import Settings from "./components/Settings"
import { DateContext, SettingsContext, MONDAY } from "./context"
import {
  loadSelectedDays,
  loadMuted,
  loadSelectedColor,
  loadCalendarType,
} from "./storage"
import AudioControl from "./audio"

function App() {
  const [settings, setSettings] = useState(() => ({
    muted: loadMuted(),
    firstDayOfWeek: MONDAY,
    selectedColor: loadSelectedColor(),
    Component: {},
    calendarType: loadCalendarType(),
  }))

  const audio = new AudioControl(settings.muted)
  const SettingsComponent = <Settings audio={audio} setSettings={setSettings} />

  const today = new Date()
  const dateContext = {
    today: today,
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth(),
    currentDay: today.getDate(),
    selectedDates: loadSelectedDays(),
  }

  return (
    <SettingsContext.Provider
      value={{ ...settings, Component: SettingsComponent }}
    >
      <DateContext.Provider value={dateContext}>
        {settings.calendarType === "simone" ? (
          <SimoneCal audio={audio} />
        ) : (
          <MonthCal audio={audio} />
        )}
      </DateContext.Provider>
    </SettingsContext.Provider>
  )
}

export default App
