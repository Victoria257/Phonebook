import { Toaster } from 'react-hot-toast';
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, clearAuthHeader } from 'redux/auth/authOperations';
import css from './Layout.module.css';

export const Layout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const name = useSelector(state => state.auth.user.name);

  const handleLogout = () => {
    dispatch(LogOut());
    clearAuthHeader();
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <nav className={css.navigation}>
        <NavLink to="/">
          <span className={css.navigationHome}>Home</span>
        </NavLink>
        {!isLoggedIn ? (
          <>
  
            <NavLink to="/signUp">
              <button> SignUp</button>
            </NavLink>
            <NavLink to="/signIn">
              <button> SignIn</button>
            </NavLink>

          </>
        ) : (
          <>
            <p className={css.navigationName}>Hello,{name}</p>
            <div>
              <NavLink to="/contacts">
                <button type="button">Contacts</button>
              </NavLink>{' '}
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </>
        )}
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

/* //  <header className={css.header}>
//    <nav>
//      <NavLink className={css.link} to="/">
//        Home
//      </NavLink>
//      {isLoggedIn && ( */

/* //        <NavLink className={css.link} to="/tasks">
//          Tasks
//        </NavLink>
//      )}
//    </nav>
//    <div className={css.wrapper}>
//      <p className={css.username}>Welcome, {user.name}</p>
//      <button type="button" onClick={() => dispatch(logOut())}>
//        Logout
//      </button>
//    </div>{' '}
//    <div>
//      <NavLink className={css.link} to="/register">
//        Register
//      </NavLink>
//      <NavLink className={css.link} to="/login">
//        Log In
//      </NavLink>
//    </div>
//  </header>; */
