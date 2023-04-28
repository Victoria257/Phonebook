import { Toaster } from 'react-hot-toast';
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export const Layout = () => {
  return (
    <div>
      <Toaster position="top-left" reverseOrder={true} />
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        <NavLink to="/logout">Log out</NavLink>
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
