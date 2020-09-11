import React, { useContext } from "react"
import { CirclePicker } from "react-color"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVolumeUp,
  faVolumeMute,
  faCalendarAlt,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons"
import { saveMuted, saveSelectedColor, saveCalendarType } from "../storage"
import { SettingsContext } from "../context"

const PICKABLE_COLORS = [
  "#4A90E2",
  "#e91e63",
  "#ff9800",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#009688",
  "#795548",
]

function getColor(isEnabled) {
  return isEnabled ? " text-gray-800" : " text-gray-400"
}

function Settings({ audio, setSettings }) {
  const settings = useContext(SettingsContext)

  const toggleMute = () => {
    const toggled = !settings.muted
    setSettings({ ...settings, muted: toggled })
    audio.mute(toggled)
    saveMuted(toggled)
  }

  const changeColor = (color, event) => {
    setSettings({ ...settings, selectedColor: color.hex })
    saveSelectedColor(color.hex)
  }

  const changeCalendarType = (type) => () => {
    setSettings({ ...settings, calendarType: type })
    saveCalendarType(type)
  }

  return (
    <div className="settings flex justify-center mt-4">
      <div className="color-picker ml-2">
        <CirclePicker
          color={settings.selectedColor}
          colors={PICKABLE_COLORS}
          circleSize={20}
          circleSpacing={5}
          width={200}
          onChangeComplete={changeColor}
        />
      </div>

      <FontAwesomeIcon
        icon={faCalendarAlt}
        className={
          "ml-8 cursor-pointer" + getColor(settings.calendarType === "simone")
        }
        onClick={changeCalendarType("simone")}
      />
      <FontAwesomeIcon
        icon={faCalendarDay}
        className={
          "ml-2 cursor-pointer" + getColor(settings.calendarType === "day")
        }
        onClick={changeCalendarType("day")}
      />

      <FontAwesomeIcon
        icon={settings.muted ? faVolumeMute : faVolumeUp}
        onClick={toggleMute}
        className={"mute-icon ml-8" + getColor(!settings.muted)}
      />
    </div>
  )
}

export default Settings
