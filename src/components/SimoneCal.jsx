import React, { useState } from "react"
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

const TODAY = new Date()

function Day({ month, day }) {
  let border = " h-7"
  if (month === TODAY.getMonth() && day === TODAY.getDate()) {
    border = " h-6 border-2 border-orange-400"
  }
  const [checked, setChecked] = useState(false)
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

  return (
    <>
      <h1 className="text-center font-bold mt-4">{TODAY.getFullYear()}</h1>
      <div className="flex justify-center">
        {months.map((_, ind) => (
          <Month key={ind} month={ind} />
        ))}
      </div>
    </>
  )
}

export default SimoneCal
