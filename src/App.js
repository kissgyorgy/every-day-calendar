import React from "react"
import MonthCal from "./components/MonthCal"
import SimoneCal from "./components/SimoneCal"
import DateContext from "./context"
import { loadSelectedDays } from "./storage"

function App() {
  const today = new Date()
  const ctx = {
    today: today,
    currentYear: today.getFullYear(),
    currentMonth: today.getMonth(),
    currentDay: today.getDate(),
    selectedDates: loadSelectedDays(),
  }

  return (
    <DateContext.Provider value={ctx}>
      <SimoneCal />
      {/* <MonthCal /> */}
    </DateContext.Provider>
  )
}

export default App
