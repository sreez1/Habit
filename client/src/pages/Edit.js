import axios from 'axios';
import {useState} from 'react';
import {useParams} from 'react-router-dom';

export const Edit =()=>{
    
    const {habitId} = useParams();
    const [habit, setHabit] = useState({})


    const handleChange = (event) => {
        setHabit({
            ...habit,
            [event.target.name]: event.target.value,
        })
    }

    const handleClick = (event) =>{
        event.preventDefault();

        axios
            .put(`http://localhost:3001/api/habit/${habitId}`, habit)
            .then((response) => {
                setHabit(response.data);
                window.location.href = 'http://localhost:3000/dashboard'
            })
            .catch((error) =>{
                console.log("Request status failed with 404 error.");
            })
        
    }

    return(
        <div>
            <form>
                <label>
                Habit Name:
                <input
                    type="text"
                    name='habit'
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                Habit Description:
                <textarea
                    name='description'
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <label>
                Start Date:
                <input
                    type="date"
                    name = 'startDate'
                    onChange={handleChange}
                    required
                />
                </label>
                <br />
                <button type="submit" onClick = {handleClick} >Edit Habit</button>
      </form>
        </div>
    );
}