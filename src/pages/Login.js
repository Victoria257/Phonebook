import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const loggedName = useSelector(state => state.auth.user.name);

  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(logIn({ email, password }));
  };

  return isLoggedIn ? (
    <div>Привіт, {loggedName}!</div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            // pattern="^[a-zA-Zа-яА-Я]+(([@][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters and @."
            required
          />
        </label>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            // pattern="^[a-zA-Zа-яА-Я]+[#$%-_.]+#$%-_]?[0-9]*)*$"
            title="Name may contain only letters, numbers and #$%-_."
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
