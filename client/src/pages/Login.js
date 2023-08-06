import {useState} from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';



export const LoginForm = () =>{
    const [username,setUsername]=useState(false);
    const [password,setPassword]=useState(false);
    const [loginError, setLoginError] = useState(false);

    const usernameHandle =(event)=>{
        setUsername(event.target.value); 
    }
    const passwordHandle =(event)=>{
        setPassword(event.target.value);
    }
    
    const loginSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:3001/api/login', {username, password});
            const {token} = response.data;
            
            localStorage.setItem('token',token);
            window.location.href = './Dashboard';
        }catch(error){
            setLoginError('Invalid credentials. Please try again.');
            console.log(loginError);
            console.log(error);
        }
    };
    return(  
        <div>
            <form>  
                <div className="container">   
                    <label>Username : </label>   
                    <input type="text" placeholder="Enter Username" className="username" name="username" onChange = {usernameHandle} required /><br/>  
                    <label>Password : </label>   
                    <input type="password" placeholder="Enter Password" className="password" name="password" onChange = {passwordHandle} required /><br/> 
                    <button type="submit" onClick={loginSubmit}>Login</button><br/>   
                    <input type="checkbox"/>Remember me<br/>   
                    <button type="button" className="cancelbtn"><br/> Cancel</button><br/> 
                    Forgot <a href="#"> password? </a>   
                </div>   
            </form>    
        </div>
    );
}
    

