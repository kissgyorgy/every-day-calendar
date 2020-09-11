import { DateUtils } from "react-day-picker"

function serializeDates(dates) {
  const dateTsArr = dates.map((d) => d.getTime())
  return JSON.stringify(dateTsArr)
}

function deserializeDates(dates) {
  if (!dates) return []
  const dateArr = JSON.parse(dates)
  return dateArr.map((d) => new Date(d))
}

function hasDay(selectedDays, searchDay) {
  const ind = selectedDays.findIndex((selectedDay) =>
    DateUtils.isSameDay(selectedDay, searchDay)
  )
  return ind !== -1
}

function loadSelectedDays() {
  const storedDates = localStorage.getItem("selectedDays")
  return deserializeDates(storedDates)
}

function saveSelectedDays(dates) {
  const serializedDates = serializeDates(dates)
  localStorage.setItem("selectedDays", serializedDates)
}

function toggleSelectedDay(date) {
  const selectedDays = loadSelectedDays()

  const ind = selectedDays.findIndex((searchDay) =>
    DateUtils.isSameDay(searchDay, date)
  )
  if (ind === -1) {
    selectedDays.push(date)
  } else {
    selectedDays.splice(ind, 1)
  }

  saveSelectedDays(selectedDays)
  return selectedDays
}

function loadMuted() {
  const storedMuted = localStorage.getItem("muted")
  return JSON.parse(storedMuted) || false
}

function saveMuted(muted) {
  localStorage.setItem("muted", JSON.stringify(muted))
}

function loadSelectedColor() {
  const storedColor = localStorage.getItem("selectedColor")
  return storedColor || "#2196f3"
}

function saveSelectedColor(hexColor) {
  localStorage.setItem("selectedColor", hexColor)
}

function loadCalendarType() {
  return localStorage.getItem("calendarType") || "simone"
}

function saveCalendarType(componentName) {
  localStorage.setItem("calendarType", componentName)
}

export {
  loadSelectedDays,
  toggleSelectedDay,
  hasDay,
  loadMuted,
  saveMuted,
  loadSelectedColor,
  saveSelectedColor,
  loadCalendarType,
  saveCalendarType,
}
