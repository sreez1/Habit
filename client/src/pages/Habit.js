import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Outlet, Link } from "react-router-dom";
import DateCalendarServerRequest from "./Calendar";
import Delete from "./Delete"; 

const Habit = ({ habit }) => {
  return (
    <div>
      <h3>{habit.habit}</h3>
      <p>{habit.description}</p>

      <DateCalendarServerRequest startDate={habit.startDate} />

      <Link to={`/dashboard/edit/${habit._id}`}>Edit</Link>

      <Delete habitId={habit._id} />

      <Outlet />
    </div>
  );
};

export default Habit;
