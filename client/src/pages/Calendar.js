import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs();

function ServerDay(props) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    selectedDates,
    onDateClick,
    startDate,
    currentDate,
    ...other
  } = props;

  const isSelected =
    !props.outsideCurrentMonth && selectedDates.some((selectedDate) => dayjs(selectedDate).isSame(day, 'day'));

  const isBeforeStartDate = dayjs(day).isBefore(startDate, 'day');
  const isAfterCurrentDate = dayjs(day).isAfter(currentDate, 'day');

  const handleClick = () => {
    if (!isBeforeStartDate && !isAfterCurrentDate) {
      onDateClick(day.toDate());
    }
  };

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🌚' : undefined}
      onClick={handleClick}
      style={{
        cursor: isBeforeStartDate || isAfterCurrentDate ? 'default' : 'pointer',
        opacity: isBeforeStartDate || isAfterCurrentDate ? 0.5 : 1, // Apply opacity to make unselectable dates faint
      }}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest({ startDate }) {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 10, 15]);
  const [selectedDates, setSelectedDates] = React.useState([]); // State to store selected dates
  const currentDate = dayjs(); // Example: Set the current date to today

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDateClick = (date) => {
    setSelectedDates((prevSelectedDates) => {
      // Check if the date is already selected, if yes, remove it from the selectedDates array
      if (prevSelectedDates.some((selectedDate) => dayjs(selectedDate).isSame(date, 'day'))) {
        return prevSelectedDates.filter((selectedDate) => !dayjs(selectedDate).isSame(date, 'day'));
      }
      // If the date is not selected, add it to the selectedDates array
      return [...prevSelectedDates, date];
    });
  };

  const completionPercentage = React.useMemo(() => {
    const totalDays = dayjs().diff(startDate, 'day') + 1;
    const selectedDays = selectedDates.filter((date) => !dayjs(date).isAfter(currentDate, 'day'));
    return totalDays > 0 ? (selectedDays.length / totalDays) * 100 : 0;
  }, [selectedDates, startDate, currentDate]);

  const streak = React.useMemo(() => {
    const sortedDates = selectedDates.map((date) => dayjs(date)).sort((a, b) => a - b);
    let streak = 0;
    let currentStreak = 0;

    for (let i = 0; i < sortedDates.length - 1; i++) {
      const diffInDays = sortedDates[i + 1].diff(sortedDates[i], 'day');
      if (diffInDays === 1) {
        currentStreak += 1;
      } else {
        currentStreak = 0;
      }
      streak = Math.max(streak, currentStreak);
    }

    return streak;
  }, [selectedDates]);

  const currentStreak = React.useMemo(() => {
    const sortedDates = selectedDates.map((date) => dayjs(date)).sort((a, b) => b - a);
    let currentStreak = 0;

    for (let i = 0; i < sortedDates.length - 1; i++) {
      const diffInDays = sortedDates[i].diff(sortedDates[i + 1], 'day');
      if (diffInDays === 1) {
        currentStreak += 1;
      } else {
        break;
      }
    }

    return currentStreak;
  }, [selectedDates]);
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
            selectedDates, // Pass selectedDates array to ServerDay component
            onDateClick: handleDateClick,
            startDate,
            currentDate,
          },
        }}
      />
      <p>Days Completed: {selectedDates.length}</p>
      <div style={{ width: '100px', height: '100px', margin: '0 auto' }}>
        <CircularProgressbar
          value={completionPercentage}
          text={`${completionPercentage.toFixed(2)}%`}
          styles={buildStyles({
            textSize: '16px',
            pathTransitionDuration: 0.5,
            pathColor: `rgba(62, 152, 199, ${completionPercentage / 100})`,
            textColor: '#3f51b5',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
        />
      </div>
      <p>Highest Streak: {streak}</p>
      <p>Current Streak: {currentStreak}</p>
    </LocalizationProvider>
  );
}
