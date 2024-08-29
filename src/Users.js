import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRunUseEffect] = useState(0);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/user/show')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [runUseEffect]);

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/api/user/showbyid/34')
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  async function deleteUser(id) {
    try {
      let res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`
      );
      if (res.status === 200) {
        setRunUseEffect((prev) => prev + 1);
      }
    } catch {
      console.log('None');
    }
  }

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className='fa-solid fa-pen-to-square'
            style={{ color: '#74afb9', fontSize: '20px', padding: '4px' }}
          ></i>
        </Link>
        <i
          onClick={() => {
            deleteUser(user.id);
          }}
          className='fa-solid fa-trash'
          style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: '20px' }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
      {/* <Outlet /> */}
    </div>
  );
}
