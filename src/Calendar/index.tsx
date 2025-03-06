import { FC, useState } from 'react'
import './styles.css'
import en from './locales/en'

export type CalendarLocale = {
  locale: string
  daysShort: string[]
  monthsLong: string[]
  formatTime: (date: Date) => string
}

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

const getEventsForDate = (events: CalendarEvent[], date: Date) => {
  return events.filter(
    (event) =>
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )
}

const generateCalendarGrid = (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

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

  const nextMonthDays = []
  const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length
  const daysToAdd = 6 * 7 - totalDaysDisplayed

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

const isToday = (date: Date) => isEqual(date, new Date())

const isEqual = (date: Date, selectedDate: Date) => {
  const today = new Date(date)
  const checkDate = new Date(selectedDate)

  today.setHours(0, 0, 0, 0)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate.getTime() === today.getTime()
}

const isFutureDate = (date: Date) => {
  const today = new Date()
  const checkDate = new Date(date)

  today.setHours(0, 0, 0, 0)
  checkDate.setHours(0, 0, 0, 0)
  return checkDate > today
}

export type CalendarEvent = {
  date: Date
  title: string
  color: string
  strikethrough?: boolean
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
  daySelector?: boolean
  locale?: CalendarLocale
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
  daySelector,
  locale = en,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="calendar-container">
      {header && (
        <div className="calendar-header">
          <div className="month-display">
            <h2>
              {locale.monthsLong[month]} {year}
            </h2>
          </div>
        </div>
      )}

      {/* Days of Week Header */}
      <div className="weekday-header">
        {locale.daysShort.map((day, index) => (
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
                  ${daySelector && isEqual(dateObj.date, selectedDate) ? 'selected' : ''}`}
              onClick={() => daySelector && setSelectedDate(dateObj.date)}
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
