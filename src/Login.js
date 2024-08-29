import { useState } from 'react';
import Header from './Components/Header';
import axios from 'axios';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accept, setAccept] = useState(false);
  const [emailError, setEmailError] = useState('');

  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (password.length < 8) {
      flag = false;
    } else flag = true;

    try {
      if (flag) {
        let res = await axios.post('http://127.0.0.1:8000/api/login', {
          email,
          password,
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
            <div style={{ textAlign: 'center' }}>
              <button type='submit'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
