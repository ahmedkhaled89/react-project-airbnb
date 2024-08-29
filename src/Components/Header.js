import { Link } from 'react-router-dom';

export default function Header(prpos) {
  function handleLogOut() {
    window.localStorage.removeItem('email');
    window.location.pathname = '/';
  }
  return (
    <div className='container'>
      <nav className='d-flex'>
        <div className='d-flex flex-1'>
          <Link to='/'>Home</Link>
          <Link to='/About'>About</Link>
        </div>
        <div className='d-flex'>
          {!window.localStorage.getItem('email') ? (
            <>
              <Link
                to='/register'
                style={{ textAlign: 'center' }}
                className='register-nav'
              >
                Register
              </Link>
              <Link
                to='/login'
                style={{ textAlign: 'center' }}
                className='register-nav'
              >
                LogIn
              </Link>
            </>
          ) : (
            <div className='register-nav' onClick={handleLogOut}>
              LogOut
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
