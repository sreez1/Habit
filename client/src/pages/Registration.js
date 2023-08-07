import React, { useState } from 'react';
import axios from 'axios';

export const RegistrationForm = () => {
 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous error messages
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Validation: Check if username is empty
    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    }

    // Validation: Check if email is in valid format
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }

    // Validation: Check if password is strong enough
    if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters long');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/register', {
        username,
        email,
        password,
      });

      setRegistrationMessage('Registration successful!');

      setUsername('');
      setEmail('');
      setPassword('');

      window.location.href = 'http://localhost:3000/login'
    } catch (error) {
      console.error(error);
      setRegistrationMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* <img className="mx-auto h-12 w-auto" src="/logo.svg" alt="Workflow" /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Kindly fill in this form to register.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <p className="text-red-500 text-sm">{usernameError}</p>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <p className="text-red-500 text-sm">{emailError}</p>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
            <p className="text-red-500 text-sm">{passwordError}</p>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >

              Register
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">{registrationMessage}</p>
      </div>
    </div>
  );
};
