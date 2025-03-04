import { SetStateAction, useState } from 'react'
import Calendar from './Calendar'
import { Button, Card } from 'antd'

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Sample data for demonstration with multiple events on the same days
  const sampleEvents = [
    {
      date: new Date(2025, 2, 3, 9, 30),
      title: '9:30am\u2002John Smith\u2002Shuttle Drop-off\u2002Alpha Store',
      color: '#4285F4',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 3, 10, 45),
      title: '10:45am\u2002Emily Johnson\u2002Shuttle Pickup\u2002Alpha Store',
      color: '#0F9D58',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 3, 13, 15),
      title: '1:15pm\u2002Michael Brown\u2002Part Delivery\u2002Alpha Store',
      color: '#DB4437',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 3, 15, 0),
      title: '3pm\u2002Sarah Davis\u2002Part Pickup\u2002Alpha Store',
      color: '#F4B400',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 5, 8, 15),
      title: '8:15am\u2002Robert Wilson\u2002Valet Pickup\u2002Alpha Store',
      color: '#4285F4',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 8, 11, 30),
      title: '11:30am\u2002Jessica Taylor\u2002Valet Drop-off\u2002Alpha Store',
      color: '#0F9D58',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 10, 14, 45),
      title: '2:45pm\u2002David Martinez\u2002Task\u2002Alpha Store',
      color: '#DB4437',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 10, 16, 30),
      title: '4:30pm\u2002Jennifer Anderson\u2002Shuttle Pickup\u2002Alpha Store',
      color: '#F4B400',
      cancelled: true,
    },
    {
      date: new Date(2025, 2, 15, 9, 0),
      title: '9am\u2002Thomas Robinson\u2002Part Delivery\u2002Alpha Store',
      color: '#4285F4',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 17, 13, 0),
      title: '1pm\u2002Lisa White\u2002Shuttle Drop-off\u2002Alpha Store',
      color: '#0F9D58',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 20, 10, 15),
      title: '10:15am\u2002James Clark\u2002Valet Pickup\u2002Alpha Store',
      color: '#DB4437',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 22, 15, 45),
      title: '3:45pm\u2002Patricia Lewis\u2002Task\u2002Alpha Store',
      color: '#F4B400',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 25, 11, 0),
      title: '11am\u2002Christopher Lee\u2002Part Pickup\u2002Alpha Store',
      color: '#4285F4',
      cancelled: false,
    },
    {
      date: new Date(2025, 2, 27, 14, 30),
      title: '2:30pm\u2002Elizabeth Walker\u2002Valet Drop-off\u2002Alpha Store',
      color: '#0F9D58',
      cancelled: true,
    },
    {
      date: new Date(2025, 2, 29, 9, 45),
      title: '9:45am\u2002Daniel Hall\u2002Shuttle Pickup\u2002Alpha Store',
      color: '#DB4437',
      cancelled: false,
    },
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
      style={{ width: '100%', height: 900, display: 'flex', flexDirection: 'column' }}
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
