import { useEffect, useState } from 'react';

import axios from 'axios';

export default function UpdateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [accept, setAccept] = useState(false);

  const id = window.location.pathname.split('/').slice(-1)[0];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);
  async function Submit(e) {
    let flag = true;
    e.preventDefault();
    setAccept(true);
    if (name === '' || password.length < 8 || password !== passwordR) {
      flag = false;
    } else flag = true;

    try {
      if (flag) {
        let res = await axios.post(
          `http://127.0.0.1:8000/api/user/update/${id}`,
          {
            name,
            email,
            password,
            password_confirmation: passwordR,
          }
        );
        if (res.status === 200) {
          window.localStorage.setItem('email', email);
          window.location.pathname = '/dashboard/users';
        }
      }
    } catch (err) {
      console.log(err);
      // setEmailError(err.response.status);
    }
  }
  return (
    <>
      {/* <Header /> */}
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
              <button type='submit'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
