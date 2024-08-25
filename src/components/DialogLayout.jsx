import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

//use portal
const DialogLayout = ({ open, handleClose, title, actionComponent, children, ...props }) => {
    return (
        <Dialog open={open} onClose={() => handleClose(false)} maxWidth="sm" fullWidth {...props}>
            <Box
                component="form"
                onSubmit={() => { handleClose(false) }}
            >
                <DialogTitle>{title}</DialogTitle>

                <DialogContent>
                    {children}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleClose(false)}>Batal</Button>
                    {actionComponent}
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default DialogLayout;