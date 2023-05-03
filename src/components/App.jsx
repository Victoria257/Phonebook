import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { refreshUser } from 'redux/auth/authOperations';
import { RestrictedRoute } from './RestrictedRout';
import { PrivateRoute } from './PrivateRoute';
import { Layout } from './Layout';

const Home = lazy(() => import('pages/Home'));
const SignUp = lazy(() => import('pages/SignUp'));
const SignIn = lazy(() => import('pages/SignIn'));
// const Login = lazy(() => import('pages/Login'));
const Contacts = lazy(() => import('pages/PageContacts'));

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
          {/* <Route
            path="register"
            element={
              <RestrictedRoute component={Register} redirectTo="/contacts" />
            }
          /> */}
          <Route
            path="signUp"
            element={
              <RestrictedRoute component={SignUp} redirectTo="/contacts" />
            }
          />
          <Route
            path="signIn"
            element={
              <RestrictedRoute component={SignIn} redirectTo="/contacts" />
            }
          />
          {/* <Route
            path="login"
            element={
              <RestrictedRoute component={Login} redirectTo="/contacts" />
            }
          /> */}
          <Route
            path="contacts"
            element={<PrivateRoute component={Contacts} redirectTo="/signIn" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
