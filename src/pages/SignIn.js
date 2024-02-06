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

import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { toast } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

import css from './SignInAndSignUp.module.css';

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
        Your phonebook
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
          backgroundColor: 'rgb(235, 241, 232)',
          border: 'solid 1px 	#0000FF',
          padding: '5px',
          borderRadius: '10px',
        },
      },
    },
  },
});

export default function SignIn() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const loggedName = useSelector(state => state.auth.user.name);

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      logIn({ email: data.get('email'), password: data.get('password') })
    )
      .unwrap()
      .then(data => console.log(data))
      .catch(() => toast.error('Incorrectly entered login or password'));
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return isLoggedIn ? (
    <div>
      <div>Привіт, {loggedName}!</div>
    </div>
  ) : (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={css.container}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className={css.box}
        >
          <Avatar
            sx={{ m: 1, bgcolor: 'secondary.main' }}
            className={css.avatar}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})"
              title="Name may contain only letters and @."
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              pattern=".{7,}"
              title="Name may contain only letters, numbers and #$%-_."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item>
              <NavLink to="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
