import React, { useState } from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { getTurnoInfo } from '../../store/reducers/turnoReducer';

interface CalendarProps {
  professional: string;
  teraphy: string;
  availableDays: Record<string, Record<number, string[]>>;
  unavailableDays: Record<string, Record<number, string[]>>;
}

const Calendar: React.FC<CalendarProps> = ({ professional, teraphy, availableDays, unavailableDays }: CalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(date.getFullYear());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const dispatch = useDispatch();

  const nextMonth = () => {
    const nextDate = new Date(selectedYear, selectedMonth + 1, 1);
    setDate(nextDate);
    setSelectedMonth(nextDate.getMonth());
    setSelectedYear(nextDate.getFullYear());
    setSelectedDay(null); // Limpiar el día seleccionado al avanzar al siguiente mes
  };

  const prevMonth = () => {
    const prevDate = new Date(selectedYear, selectedMonth - 1, 1);
    setDate(prevDate);
    setSelectedMonth(prevDate.getMonth());
    setSelectedYear(prevDate.getFullYear());
    setSelectedDay(null); // Limpiar el día seleccionado al retroceder al mes anterior
  };

  const handleDayClick = (day: number) => {
    const currentMonthDays = availableDays[date.toLocaleString('default', { month: 'long' }).toLowerCase()] || {};
    if (!unavailableDays[date.toLocaleString('default', { month: 'long' }).toLowerCase()][day] && currentMonthDays[day]) {
      setSelectedDay(day);
    }
  };

  const handleHourClick = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleConfirm = () => {
    const turno = {
      profesionalName: professional,
      typeOfTherapy: teraphy,
      turn: `${selectedDay}/${selectedMonth + 1}/${selectedYear}, a las ${selectedHour}hs `,
    };
    dispatch(getTurnoInfo(turno));
  };

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const startDay = new Date(selectedYear, selectedMonth, 1).getDay();
  const currentMonthDays = availableDays[date.toLocaleString('default', { month: 'long' }).toLowerCase()] || {};
  const currentAvailableHours = selectedDay ? (availableDays[date.toLocaleString('default', { month: 'long' }).toLowerCase()][selectedDay] || []) : [];
  const currentUnavailableDays = unavailableDays[date.toLocaleString('default', { month: 'long' }).toLowerCase()] || {};

  const days: JSX.Element[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dayClassName = `rounded-lg day${Object.keys(currentMonthDays).includes(i.toString()) ? ' available' : Object.keys(currentUnavailableDays).includes(i.toString()) ? ' unavailable' : ' disabled'} ${selectedDay === i ? ' selected' : ''}`;

    days.push(
      <div key={i} className={dayClassName} onClick={() => handleDayClick(i)}>
        {i}
      </div>
    );
  }

  for (let i = 0; i < startDay; i++) {
    days.unshift(<div key={`blank-${i}`} className="empty"></div>);
  }

  const allHours = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="header">
          <button onClick={prevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
              <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
          </button>
          <h2>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={nextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
            </svg>
          </button>
        </div>
        <div className="days">
          <div className="day">D</div>
          <div className="day">L</div>
          <div className="day">M</div>
          <div className="day">M</div>
          <div className="day">J</div>
          <div className="day">V</div>
          <div className="day">S</div>
          {days}
        </div>
      </div>
      <div className="form-container d-flex flex-column mt-2 justify-content-center align-items-center">
        <div className="hours d-flex flex-wrap">
          {allHours.map(hour => (
            <div
              key={hour}
              className={`m-1 hour${currentAvailableHours.includes(hour) ? ' available' : ' d-none'}${selectedHour === hour ? ' selected' : ''}`}
              onClick={() => handleHourClick(hour)}
            >
              {hour}
            </div>
          ))}
        </div>
        <button className="btn rounded-pill text-white px-4 w-75 mt-2" style={{ backgroundColor: '#563d7c' }} onClick={handleConfirm} disabled={!selectedHour} type="button" data-dismiss="modal" aria-label="Close">Confirmar día y horario</button>
      </div>
    </div>
  );
};

export default Calendar;
