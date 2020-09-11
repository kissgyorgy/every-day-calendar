import React from "react"

const MONDAY = 1

const DateContext = React.createContext({})

const SettingsContext = React.createContext({
  muted: false,
  selectedColor: "#2196f3",
  firstDayOfWeek: MONDAY,
})

export { DateContext, SettingsContext, MONDAY }
