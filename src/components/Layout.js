import { Toaster } from 'react-hot-toast';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut, clearAuthHeader } from 'redux/auth/authOperations';
import css from './Layout.module.css';

export const Layout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const name = useSelector(state => state.auth.user.name);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(LogOut());
    clearAuthHeader();
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={true} />
      <nav className={css.navigation}>
        <NavLink to="/">
          <span
            className={
              location.pathname !== '/'
                ? css.navigationHome
                : css.navigationHomeActive
            }
          >
            Home
          </span>
        </NavLink>

        {!isLoggedIn ? (
          <div className={css.logOutContainer}>
            <NavLink to="/signUp">
              <button> SignUp</button>
            </NavLink>
            <NavLink to="/signIn">
              <button> SignIn</button>
            </NavLink>
          </div>
        ) : (
          <>
            <div className={css.isLoggedContainer}>
              <p className={css.navigationName}>Hello, {name}</p>
              <div className={css.isLoggedWrapper}>
                {location.pathname !== '/contacts' && (
                  <NavLink to="/contacts">
                    <button type="button">Contacts</button>
                  </NavLink>
                )}
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
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
