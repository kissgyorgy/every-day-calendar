import React, { useState, useContext } from "react"
import DateContext from "../context"
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

function Day({ month, day }) {
  const date = new Date(2020, month, day)
  const ctx = useContext(DateContext)
  const selected = hasDay(ctx.selectedDates, date)
  const [checked, setChecked] = useState(selected)

  let border = " h-7"
  if (month === ctx.currentMonth && day === ctx.currentDay) {
    border = " h-6 border-2 border-orange-400"
  }
  const dayColor = checked ? " bg-green-400" : " bg-gray-200"

  const handleClick = () => {
    setChecked(!checked)
  }

  return (
    <div
      className={
        "w-8 ml-1 mt-1 text-center rounded-lg cursor-pointer" +
        dayColor +
        border
      }
      onClick={handleClick}
    >
      {day}.
    </div>
  )
}

function Month({ month }) {
  const numDays = new Date(2020, month + 1, 0).getDate()
  const days = [...Array(numDays).keys()]
  const monthName = SHORT_MONTH_NAMES[month]

  return (
    <div key={month} className="flex flex-col">
      <div className="text-center">{monthName}</div>
      {days.map((_, ind) => (
        <Day key={month + ind} month={month} day={ind + 1}></Day>
      ))}
    </div>
  )
}

function SimoneCal() {
  const months = [...Array(12).keys()]
  const ctx = useContext(DateContext)

  return (
    <>
      <h1 className="text-center font-bold mt-4">{ctx.currentYear}</h1>
      <div className="flex justify-center">
        {months.map((_, ind) => (
          <Month key={ind} month={ind} />
        ))}
      </div>
    </>
  )
}

export default SimoneCal
