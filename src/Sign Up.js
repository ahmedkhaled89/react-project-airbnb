import { useState } from 'react';
import Header from './Components/Header';

import axios from 'axios';

export default function SingUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState('');

  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (name === '' || password.length < 8 || password !== passwordR) {
      flag = false;
    } else flag = true;

    try {
      if (flag) {
        let res = await axios.post('http://127.0.0.1:8000/api/register', {
          name,
          email,
          password,
          password_confirmation: passwordR,
        });
        if (res.status === 200) {
          window.localStorage.setItem('email', email);
          window.location.pathname = '/';
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <>
      <Header />
      <div className='parent'>
        <div className='register'>
          <form onSubmit={Submit}>
            <label htmlFor='name'>Name:</label>
            <input
              id='name'
              type='text'
              placeholder='Name...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name === '' && accept && (
              <p className='error'>Username is required</p>
            )}
            <label htmlFor='email'>Email:</label>
            <input
              id='email'
              type='email'
              placeholder='Email...'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError === 422 && (
              <p className='error'>The email has already been taken.</p>
            )}
            <label htmlFor='password'>Password:</label>
            <input
              id='password'
              type='password'
              placeholder='password...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && (
              <p className='error'>Password must be more than 8 Chars</p>
            )}
            <label htmlFor='repeat'>Repeat Password:</label>
            <input
              id='repeat'
              type='password'
              placeholder='repeat password...'
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />
            {passwordR !== password && accept && (
              <p className='error'>Password does not match</p>
            )}
            <div style={{ textAlign: 'center' }}>
              <button type='submit'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
