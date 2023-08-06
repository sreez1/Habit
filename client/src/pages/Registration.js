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


// export const RegistrationForm = () => (
//     <div>
//             <form >
//       <div>
//         <h1>Register</h1>
//         <p>Kindly fill in this form to register.</p>
        
//         <input
//           type="text"
//           placeholder="Enter username"
//           name="username"
//           id="username"
//           required
//         />

        
//         <input
//           type="text"
//           placeholder="Enter Email"
//           name="email"
//           id="email"
//           required
//         />

        
//         <input
//           type="password"
//           placeholder="Enter Password"
//           name="pwd"
//           id="pwd"
//           required
//         />

//         <button type="submit">Register</button>
//       </div>
//       <div>
//         <p>Already have an account? <a href="#">Log in</a>.</p>
//       </div>
//     </form>

//     </div>
// )