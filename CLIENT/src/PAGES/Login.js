import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Helpers/AuthContext';

export const Login = () => {

    const [username, setUsername] = useState("");
    const [pswd, setPswd] = useState("");

    const {setAuthState} = useContext(AuthContext)
    const navigate = useNavigate();

    const login = () => {
        const data = {username: username, password: pswd}
        axios.post('http://localhost:3003/auth/login', data).then( (response) => {
            if(response.data.error) { 
              alert(response.data.error);
            } else { 
              localStorage.setItem('accessToken', response.data.token);
              setAuthState({username: response.data.username, id: response.data.id, status: true})
              navigate('/');
            }
        })
        setPswd(""); setUsername("");
    }

  return (
    <div className='loginContainer'>
        <label>Username: </label>
        <input type='text' name='username' onChange={(e) => {setUsername(e.target.value)}}/>
        <label>Password: </label>
        <input type='password' name='pswd' onChange={(e) => {setPswd(e.target.value)}}/>
        <button onClick={login}>Login</button>
    </div>
  )
}
