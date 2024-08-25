import React, { useRef } from 'react';
import { Box, Paper, Typography, Button, } from '@mui/material';
import TogglePassword from '../components/TogglePassword';
import Alert from '../components/Alert';
import { handleChangePassword } from '../plugins/http';

const UbahPasswordView = () => {
    const password = useRef(null)
    const newPassword = useRef(null)
    const confirmPassword = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();

        const enteredPassword = password.current.value;
        const enteredNewPassword = newPassword.current.value;
        const enteredConfirmPassword = confirmPassword.current.value;

        const passwordData = {
            password: enteredPassword,
            newPassword: enteredNewPassword,
            confirmPassword: enteredConfirmPassword
        }

        const { message, success } = await handleChangePassword(passwordData)

        if (success) {
            Alert('success', message)
        } else {
            Alert('error', message)
        }
    };

    return (
        <Box sx={{ height: "100%" }}>
            <Paper elevation={6} sx={{ padding: 4 }}>
                <Typography variant='h4' gutterBottom sx={{ borderBottom: "2px solid black" }}>
                    Ubah Password
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ mt: 2 }}>
                        <TogglePassword
                            ref={password}
                            label="Password Lama"
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TogglePassword
                            ref={newPassword}
                            label="Password Baru"
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TogglePassword
                            ref={confirmPassword}
                            label="Konfirmasi Password Baru"
                            variant="outlined"
                            fullWidth
                            required
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                        fullWidth
                    >
                        Ubah Password
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default UbahPasswordView;
