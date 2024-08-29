import { Route, Routes } from 'react-router-dom';
import SingUp from './Sign Up';
import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard';
import Users from './Users';
import UpdateUser from './UpdateUser';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<SingUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='users' element={<Users />} />
          <Route path='users/:id' element={<UpdateUser />} />
        </Route>
      </Routes>
    </div>
  );
}
