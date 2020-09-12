import React, { useState, useContext } from "react"
import { toggleSelectedDay, hasDay } from "../storage"
import { DateContext, SettingsContext } from "../context"
import "../tailwind.css"

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function Day({ month, day, audio }) {
  const date = new Date(2020, month, day)
  const dateCtx = useContext(DateContext)
  const settings = useContext(SettingsContext)
  const selected = hasDay(dateCtx.selectedDates, date)
  const [checked, setChecked] = useState(selected)

  let border = " h-7"
  if (month === dateCtx.currentMonth && day === dateCtx.currentDay) {
    border = " h-6 border-2 border-orange-400"
  }

  let bgClass, bgColor

  if (checked) {
    bgClass = ""
    bgColor = settings.selectedColor
  } else {
    bgClass = " bg-gray-200"
    bgColor = ""
  }

  const handleClick = () => {
    const toggled = !checked
    audio.play(toggled)
    setChecked(toggled)
    toggleSelectedDay(date)
  }

  return (
    <div
      className={
        "w-8 ml-1 mt-1 text-center rounded-lg cursor-pointer" + bgClass + border
      }
      style={{ backgroundColor: bgColor }}
      onClick={handleClick}
    >
      {day}.
    </div>
  )
}

function Month({ month, audio }) {
  const numDays = new Date(2020, month + 1, 0).getDate()
  const days = [...Array(numDays).keys()]
  const monthName = SHORT_MONTH_NAMES[month]

  return (
    <div key={month} className="flex flex-col">
      <div className="text-center">{monthName}</div>
      {days.map((_, ind) => (
        <Day key={month + ind} month={month} day={ind + 1} audio={audio} />
      ))}
    </div>
  )
}

function SimoneCal({ audio }) {
  const months = [...Array(12).keys()]
  const dateCtx = useContext(DateContext)
  const settings = useContext(SettingsContext)

  return (
    <div className="overflow-auto pb-20 h-screen">
      <h1 className="text-center font-bold mt-4">{dateCtx.currentYear}</h1>
      <div className="flex justify-center mb-4">
        {months.map((_, ind) => (
          <Month key={ind} month={ind} audio={audio} />
        ))}
      </div>
      {settings.Component}
    </div>
  )
}

export default SimoneCal
