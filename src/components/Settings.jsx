import React, { useContext } from "react"
import { CirclePicker } from "react-color"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVolumeUp,
  faVolumeMute,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons"
import { saveMuted, saveSelectedColor } from "../storage"
import { SettingsContext } from "../context"

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

function Settings({ audio, setSettings }) {
  const settings = useContext(SettingsContext)

  const toggleMute = () => {
    const toggled = !settings.muted
    setSettings({ ...settings, muted: toggled })
    audio.muted = toggled
    saveMuted(toggled)
  }

  const changeColor = (color, event) => {
    setSettings({ ...settings, selectedColor: color.hex })
    saveSelectedColor(color.hex)
  }

  const icon = settings.muted ? faVolumeMute : faVolumeUp
  const mutedStyle = settings.muted ? { color: "grey" } : {}

  return (
    <div className="settings">
      <button
        style={{ backgroundColor: settings.selectedColor }}
        className="picker-toggler"
      />

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

      <FontAwesomeIcon
        icon={icon}
        onClick={toggleMute}
        className="mute-icon"
        style={mutedStyle}
      />
    </div>
  )
}

export default Settings
