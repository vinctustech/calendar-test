import { FC, useState } from 'react'
import './styles.css'

export type CalendarEvent = {
  date: Date
  title: string
  color: string
  strikethrough?: boolean
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Get month names for display
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Function to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

// Function to get day of week (0-6) for first day of month
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

// Check if a date has events
const getEventsForDate = (events: CalendarEvent[], date: Date) => {
  return events.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )
}

// Generate calendar grid
const generateCalendarGrid = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Previous month's days to show
  const prevMonthDays = []
  if (firstDayOfMonth > 0) {
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1
      prevMonthDays.push({
        day,
        month: prevMonth,
        year: prevMonthYear,
        isCurrentMonth: false,
        date: new Date(prevMonthYear, prevMonth, day),
      })
    }
  }

  // Current month's days
  const currentMonthDays = []
  for (let day = 1; day <= daysInMonth; day++) {
    currentMonthDays.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    })
  }

  // Next month's days to show
  const nextMonthDays = []
  const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length
  const daysToAdd = 42 - totalDaysDisplayed // 6 weeks display

  if (daysToAdd > 0) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year

    for (let day = 1; day <= daysToAdd; day++) {
      nextMonthDays.push({
        day,
        month: nextMonth,
        year: nextMonthYear,
        isCurrentMonth: false,
        date: new Date(nextMonthYear, nextMonth, day),
      })
    }
  }

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
}

// Format date for display and comparison
const formatDateString = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

// Check if a date is today
const isToday = (date: Date) => {
  const today = new Date()
  return formatDateString(date) === formatDateString(today)
}

// Check if a date is selected
const isSelected = (date: Date, selectedDate: Date) => {
  return formatDateString(date) === formatDateString(selectedDate)
}

// Check if a date is in the future
const isFutureDate = (date: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date > today
}

export type CalendarProps = {
  month: number
  year: number
  events: CalendarEvent[]
  maxEventsPerDay?: number
  onEventClick?: (event: CalendarEvent) => void
  onMoreEventsClick?: (date: Date, events: CalendarEvent[]) => void
  header?: boolean
  moreText?: string
}

const Calendar: FC<CalendarProps> = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  events,
  maxEventsPerDay = 2,
  onEventClick,
  onMoreEventsClick,
  header,
  moreText = 'more',
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="calendar-container">
      {header && (
        <div className="calendar-header">
          <div className="month-display">
            <h2>
              {monthNames[month]} {year}
            </h2>
          </div>
        </div>
      )}

      {/* Days of Week Header */}
      <div className="weekday-header">
        {dayNames.map((day, index) => (
          <div key={index} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {generateCalendarGrid(year, month).map((dateObj, index) => {
          const dateEvents = getEventsForDate(events, dateObj.date)

          return (
            <div
              key={index}
              className={`calendar-cell ${!dateObj.isCurrentMonth ? 'other-month' : ''} 
                  ${isToday(dateObj.date) ? 'today' : ''} 
                  ${isSelected(dateObj.date, selectedDate) ? 'selected' : ''}`}
              onClick={() => setSelectedDate(dateObj.date)}
            >
              <div className="date-number-container">
                <span className={`date-number ${isToday(dateObj.date) ? 'today-number' : ''}`}>
                  {dateObj.day}
                </span>
              </div>

              <div className="events-container">
                {dateEvents.slice(0, maxEventsPerDay).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`
                      event-item 
                      ${isFutureDate(event.date) ? 'future-event' : ''} 
                      ${event.strikethrough ? 'cancelled-event' : ''}
                    `}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onEventClick) {
                        onEventClick(event)
                      }
                    }}
                  >
                    <span className="event-dot" style={{ backgroundColor: event.color }}></span>
                    <span className="event-title">{event.title}</span>
                  </div>
                ))}

                {dateEvents.length > maxEventsPerDay && (
                  <div
                    className="more-events"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onMoreEventsClick) {
                        onMoreEventsClick(dateObj.date, dateEvents)
                      }
                    }}
                  >
                    +{dateEvents.length - maxEventsPerDay} {moreText}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
