import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Outlet, Link } from "react-router-dom";
import DateCalendarServerRequest from "./Calendar";
import axios from "axios";
import jwt from "jwt-decode";
import Habit from "./Habit";

export const Dashboard = () => {
  const [habit, setHabit] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwt(token);
    const userId = decodedToken.userId;

    axios
      .get(`http://localhost:3001/api/habit/${userId}`)
      .then((response) => {
        setHabit(response.data);
      })
      .catch((error) => {
        console.log("Request status failed with 404 error. No habits.");
      });
  }, []);

  return (
    <div>
      {habit.map((habit) => (
        <Habit key={habit.id} habit={habit} />
      ))}
    </div>
  );
};
