import React, { useState } from 'react';
import './styles.css';
import unavailableDays from '../../data/unavailableDays';
import availableDays from '../../data/availableDays';
import { useDispatch } from 'react-redux';
import { getTurnoInfo } from '../../store/reducers/turnoReducer';


interface CalendarProps {
  professional: string;
  teraphy: string;
}

const Calendar: React.FC<CalendarProps>  = ({professional,teraphy}) => {

  const [date, setDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const dispatch = useDispatch()

  const nextMonth = () => {
    setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleDayClick = (day: number) => {
    if (!currentUnavailableDays[day]) {
      setSelectedDay(day);
    }
  };

  const handleHourClick = (hour: string) => {
    if (currentAvailableHours.includes(hour)) {
      setSelectedHour(hour);
    }
  };

  const handleConfirm = () => {
    const turno: any = {
      profesionalName: professional,
      typeOfTherapy: teraphy,
      turn:`${selectedDay}/${date.getMonth() + 1}/${date.getFullYear()}, a las ${selectedHour}hs `,
    };
    dispatch(getTurnoInfo(turno))
  };

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();

  const currentAvailableDays = availableDays[monthName] || {};
  const currentAvailableHours = selectedDay ? (availableDays[monthName]?.[selectedDay] || []) : [];
  const currentUnavailableDays = unavailableDays[monthName] || {};

  const days: JSX.Element[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dayClassName = `rounded-lg day${Object.keys(currentAvailableDays).includes(i.toString()) ? ' available' : Object.keys(currentUnavailableDays).includes(i.toString()) ? ' unavailable' : ''}`;

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
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
          </svg>
          </button>
          <h2>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={nextMonth}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
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
      {
        <div className="form-container d-flex flex-column mt-2 justify-content-center align-items-center">
          <div className="hours d-flex flex-wrap">
              {allHours.map(hour => (
                <div
                  key={hour}
                  className={`m-1 hour${currentAvailableHours.includes(hour) ? ' available' : ' unavailable'}${selectedHour === hour ? ' selected' : ''}`}
                  onClick={() => handleHourClick(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
          <button  className="btn rounded-pill text-white px-4 w-75 mt-2" style={{ backgroundColor: '#563d7c' }} onClick={handleConfirm} disabled={!selectedHour} type="button" data-dismiss="modal" aria-label="Close">Confirmar día y horario</button>
        </div>
      }
    </div>
  );
};

export default Calendar;