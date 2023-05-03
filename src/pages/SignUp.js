import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from 'redux/auth/authOperations';
// import css from './Register.module.css';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="http://localhost:3000/goit-react-hw-08-phonebook"
      >
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          border: 'solid 1px 	#0000FF',
          padding: '5px',
          borderRadius: '10px',
        },
      },
    },
  },
});

export default function SignUp() {
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      register({
        name: data.get('firstName'),
        email: data.get('email'),
        password: data.get('password'),
      })
    )
      .unwrap()
      .then(toast.success(`user ${name} add`))
      .catch(() =>
        toast.error('Incorrectly entered login or password or name')
      );

    setName(data.get('firstName'));
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   firstName: data.get('firstName'),
    // });
  };

  return isLoggedIn ? (
    <div>
      <div>Welcome, {name}!</div>
    </div>
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Name"
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces."
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  pattern="^[a-zA-Zа-яА-Я0-9._%+-]+@[a-zA-Zа-яА-Я0-9.-]+\.[a-zA-Zа-яА-Я]{2,}$"
                  title="Email may contain only letters and @."
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  pattern=".{7,}"
                  placeholder="min 7 symbols"
                  title="Password may contain only letters, numbers and #$%-_."
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/signIn" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
