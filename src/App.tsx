import { SetStateAction, useState } from 'react'
import Calendar from './Calendar'
import { Button, Card } from 'antd'

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Sample data for demonstration
  const sampleEvents = [
    {
      id: 1,
      title: 'Meeting with Team',
      date: new Date(2025, 2, 3),
      color: '#4285F4',
      completed: false,
    },
    {
      id: 2,
      title: 'Doctor Appointment',
      date: new Date(2025, 2, 15),
      color: '#0F9D58',
      completed: true,
    },
    {
      id: 3,
      title: 'Birthday Party',
      date: new Date(2025, 2, 20),
      color: '#DB4437',
      completed: false,
    },
    {
      id: 4,
      title: 'Project Deadline',
      date: new Date(2025, 2, 12),
      color: '#F4B400',
      completed: false,
    },
    { id: 5, title: 'Team Lunch', date: new Date(2025, 2, 8), color: '#0F9D58', completed: true },
  ]

  const handleMonthChange = (month: SetStateAction<number>, year: SetStateAction<number>) => {
    setCurrentMonth(month)
    setCurrentYear(year)
  }

  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear
    handleMonthChange(newMonth, newYear)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear
    handleMonthChange(newMonth, newYear)
  }

  // Navigate to today
  // const goToToday = () => {
  //   const today = new Date()
  //   handleMonthChange(today.getMonth(), today.getFullYear())
  // }

  return (
    <Card
      style={{ width: 1500, height: 900, display: 'flex', flexDirection: 'column' }}
      styles={{
        body: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          overflow: 'hidden',
        },
      }}
    >
      <Button type="primary" onClick={prevMonth}>
        prev
      </Button>
      <Button type="primary" onClick={nextMonth}>
        next
      </Button>
      <Calendar month={currentMonth} year={currentYear} events={sampleEvents} />
    </Card>
  )
}

export default App
