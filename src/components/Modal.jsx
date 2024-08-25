import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

const Modal = ({ open, onClose, title, children, showAction = false, actionButton }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>

            {showAction && (
                <DialogActions>
                    {actionButton()}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Modal;


{/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={imageUrl} alt="Absensi" style={{ maxWidth: '100%', height: 'auto' }} />
</Box> */}