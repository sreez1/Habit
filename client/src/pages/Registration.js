import React, {useState} from 'react';
import axios from 'axios';

export const RegistrationForm = () =>{
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:3001/api/register',{
        username,
        email,
        password,
      });

      setRegistrationMessage('Registration succesful!');

      setUsername('');
      setEmail('');
      setPassword('');
    }catch(error){
      console.error(error);
      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  const registrationSubmit =()=>{
    window.location.href = "./login"
  }

  return(
    <div>
      <h1>Register</h1>
      <p>Kindly fill in this form to register.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder ="Enter Username"
          required
        />
        <br/> <br/>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder ="Enter Email"
          required
        />
        <br/><br/>
        <input
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          placeholder="Enter password"
          required
          />
        <br /> <br />
          <button type="submit" onClick={registrationSubmit}>Register</button>
      </form>
      <p>{registrationMessage}</p>
    </div>
  )
}

