import React, { useState } from "react"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { CirclePicker } from "react-color"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVolumeUp,
  faVolumeMute,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons"
import { loadSelectedDays, toggleSelectedDay } from "../storage"
import "./MonthCal.css"

const pickableColors = [
  "#4A90E2",
  "#e91e63",
  "#ff9800",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#009688",
  "#795548",
]

const monday = 1

function MonthCal() {
  const storedMuted = localStorage.getItem("muted")
  const storedColor = localStorage.getItem("selectedColor")

  const [muted, setMuted] = useState(JSON.parse(storedMuted) || false)
  const [selectedColor, setSelectedColor] = useState(storedColor || "#2196f3")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [selectedDays, setSelectedDays] = useState(() => loadSelectedDays())

  const audio = new Audio("ding.mp3")
  audio.muted = muted

  const handleDayClick = (day, { selected }) => {
    if (selected) {
      const lastSelectedDay = selectedDays[selectedDays.length - 1]
      if (DateUtils.isSameDay(lastSelectedDay, day)) {
        audio.pause()
        audio.currentTime = 0
      }
    } else {
      audio.currentTime = 0
      audio.play()
    }
    const newSelectedDays = toggleSelectedDay(day)
    setSelectedDays(newSelectedDays)
  }

  const toggleMute = () => {
    const toggled = !muted
    audio.muted = toggled
    setMuted(toggled)
    localStorage.setItem("muted", JSON.stringify(toggled))
  }

  const changeColor = (color, event) => {
    setShowColorPicker(false)
    setSelectedColor(color.hex)
    localStorage.setItem("selectedColor", color.hex)
  }

  const hideColorPicker = (event) => {
    if (showColorPicker) {
      setShowColorPicker(false)
    }
  }

  const icon = muted ? faVolumeMute : faVolumeUp
  const mutedStyle = muted ? { color: "grey" } : {}

  return (
    <div className="container" onClick={hideColorPicker}>
      <div className="App">
        <DayPicker
          onDayClick={handleDayClick}
          modifiers={{ selected: selectedDays }}
          modifiersStyles={{
            selected: { backgroundColor: selectedColor },
          }}
          firstDayOfWeek={monday}
        />

        <div className="settings">
          {!showColorPicker && (
            <button
              style={{ backgroundColor: selectedColor }}
              onClick={() => setShowColorPicker(true)}
              className="picker-toggler"
            ></button>
          )}

          {showColorPicker && (
            <div className="color-picker">
              <FontAwesomeIcon icon={faHandPointRight} className="hand-right" />
              <CirclePicker
                colors={pickableColors}
                circleSize={20}
                circleSpacing={5}
                onChangeComplete={changeColor}
                width="200px"
              />
            </div>
          )}

          <FontAwesomeIcon
            icon={icon}
            onClick={toggleMute}
            className="mute-icon"
            style={mutedStyle}
          />
        </div>
      </div>
    </div>
  )
}
export default MonthCal
