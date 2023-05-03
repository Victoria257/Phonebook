import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/auth/authOperations';
import css from './Register.module.css';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
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
    console.log(event.currentTarget);
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(toast.success(`user ${name} add`))
      .catch(() =>
        toast.error('Incorrectly entered login or password or name')
      );
  };

  return isLoggedIn ? (
    <div>
      <div>Welcome, {name}!</div>
    </div>
  ) : (
    <div>
      <h2 className={css.title}>Register:</h2>
      <form onSubmit={handleSubmit} className={css.form}>
        <label>
          Username
          <input
            className={css.name}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces."
            required
          />
        </label>
        <label>
          Email
          <input
            className={css.email}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-zA-Zа-яА-Я]{2,}$"
            title="Name may contain only letters and @."
            required
          />
        </label>
        <label>
          Password
          <input
            className={css.password}
            type="text"
            name="password"
            value={password}
            onChange={handleChange}
            pattern=".{7,}"
            placeholder="min 7 symbols"
            title="Name may contain only letters, numbers and #$%-_."
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
