import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'
import Alert from '../components/Alert';
import TogglePassword from '../components/TogglePassword';
import { handleLoginUser } from '../plugins/http';

const Login = () => {
  const username = useRef();
  const password = useRef()

  const handleLogin = async (e) => {
    e.preventDefault();

    const enteredUsername = username.current.value
    const enteredPassword = password.current.value

    const { message, success, token } = await handleLoginUser(enteredUsername, enteredPassword)

    if (success) {
      Alert('success', message, '', () => {
        sessionStorage.setItem("token", token)
        window.location.reload();
      })
    } else {
      Alert('error', message)
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ py: 2, px: 4 }}>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Typography variant='h3'>
              Login
            </Typography>
            <hr />
          </Box>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              inputRef={username}
              required
            />

            <TogglePassword
              ref={password}
              label="Password"
              variant="outlined"
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </Paper>
      </Container >
    </Box >
  )
}

export default Login
