import React, { useState } from 'react';
import axios from 'axios'
export const HabitCreationForm = () => {
    const [habitName, setHabitName] = useState('');
    const [habitDescription, setHabitDescription] = useState('');
    const [startDate, setStartDate] = useState('');

    const habitnameHandle =(event)=>{
      setHabitName(event.target.value);
    }

    const descriptionHandle =(event)=>{
      setHabitDescription(event.target.value);
    }

    const startDateHandle =(event)=>{
      setStartDate(event.target.value);
    }

    const habitSubmitHandle = async (event) => {
      event.preventDefault();
      const token = window.localStorage.getItem('token');
      const config = {
        headers: {Authorization:`Bearer ${token}`}
      };
        
      try{
        const response = await axios.post('http://localhost:3001/api/habit', {habitName, habitDescription, startDate}, config);
        console.log("response", response);
        window.location.href= "../dashboard";
      }
      catch(error){
        console.log(error);
      }
    };
  
    return (
      <form>
        <label>
          Habit Name:
          <input
            type="text"
            value={habitName}
            onChange={habitnameHandle}
            required
          />
        </label>
        <br />
        <label>
          Habit Description:
          <textarea
            value={habitDescription}
            onChange={descriptionHandle}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={startDateHandle}
            required
          />
        </label>
        <br />
        <button type="submit" onClick={habitSubmitHandle}>Create Habit</button>
      </form>
    );
};

export default HabitCreationForm;
