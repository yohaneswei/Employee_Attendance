import React, { useState, forwardRef } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TogglePassword = forwardRef(({ ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <TextField
            type={showPassword ? 'text' : 'password'}
            inputRef={ref}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...props}
        />
    );
});

export default TogglePassword;
