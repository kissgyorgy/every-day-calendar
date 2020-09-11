import React, { useState } from "react"
import MonthCal from "./components/MonthCal"
import SimoneCal from "./components/SimoneCal"
import Settings from "./components/Settings"
import { DateContext, SettingsContext, MONDAY } from "./context"
import { loadSelectedDays, loadMuted, loadSelectedColor } from "./storage"

function App() {
  const [settings, setSettings] = useState(() => ({
    muted: loadMuted(),
    firstDayOfWeek: MONDAY,
    selectedColor: loadSelectedColor(),
    Component: {},
  }))

  const audio = new Audio("ding.mp3")
  audio.muted = settings.muted

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
        <SimoneCal audio={audio} />
        {/* <MonthCal audio={audio} /> */}
      </DateContext.Provider>
    </SettingsContext.Provider>
  )
}

export default App
