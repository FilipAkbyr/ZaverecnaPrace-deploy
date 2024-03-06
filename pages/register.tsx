import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import React, { useState } from 'react';
import {authUtils} from "../firebase/auth-utils";
import router from 'next/router';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleForm = async (event: any) => {
    event.preventDefault();
    const registerResult = await authUtils.register(email, password);
    return router.push('/');
  };

  const buttonHover = {
    "&:hover": {
      backgroundColor: 'black',
      color: 'white'
    },
  };

  return (
      <Box
        width="100vw"
        height="100vh"
        top={0}
        sx={{ bgcolor: 'white', position: 'absolute', zIndex: -1 }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{ pb: '2  5px', border: '2px solid black', borderRadius: '20px', mt: '10%' }}
        >
          <Box
            sx={{
              padding: '25px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#3562a6" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleForm}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                color="info"
                onChange={(e) => {
                  const { value } = e.target;
                  setEmail(value);
                }}
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
                color="info"
                onChange={(e) => {
                  const { value } = e.target;
                  setPassword(value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#3562a6", color: 'white', ...buttonHover }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link component={NextLink} href="/login" variant="body2" sx={{ color: 'black', textDecorationColor: 'black' }}>
                    Already have an account?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={NextLink} href="/" variant="body2" sx={{ color: 'black', textDecorationColor: 'black', marginLeft: "150px" }}>
                    Home Page
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};

export default Login;
