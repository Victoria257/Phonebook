import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Home } from 'pages/Home';
import { Register } from 'pages/Register';
import { Login } from 'pages/Login';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { Contacts } from 'pages/PageContacts';
import { refreshUser } from 'redux/auth/authOperations';
import { RestrictedRoute } from './RestrictedRout';
import { PrivateRoute } from './PrivateRoute';

function App() {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(state => state.auth.isRefreshing);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    isLoggedIn && dispatch(refreshUser());
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    'Fetching user data...'
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="register"
            element={
              <RestrictedRoute component={Register} redirectTo="/contacts" />
            }
          />
          <Route
            path="login"
            element={
              <RestrictedRoute component={Login} redirectTo="/contacts" />
            }
          />
          <Route
            path="contacts"
            element={<PrivateRoute component={Contacts} redirectTo="/login" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
