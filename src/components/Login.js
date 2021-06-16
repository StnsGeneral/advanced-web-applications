import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { push } = useHistory();

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // const error = '';
  //replace with error state

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // if (credentials.username != 'Lambda' || credentials.password != 'i<3Lambd4') {
  //   setErrorMessage('Username or Password not valid.');
  // }

  const login = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        push('/bubbles');
      })
      .catch((err) => console.error(err));

    if (credentials.username === '' || credentials.password === '') {
      setErrorMessage('Username and password are required.');
    } else if (
      credentials.username !== 'Lambda' ||
      credentials.password !== 'School'
    ) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            data-testid="username"></input>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            data-testid="password"></input>
          <button>Log in</button>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">
        {errorMessage}
      </p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.
