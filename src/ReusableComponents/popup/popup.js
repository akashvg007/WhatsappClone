import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function Popup(props) {
    const { open, handleClose, title, children, btns } = props;

    return (
        <Dialog open={open} onClose={handleClose} onClick={e => e.stopPropagation()}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent className="min-width">
                {children}
            </DialogContent>
            <DialogActions >
                {
                    btns && btns.map(btn => (
                        <Button onClick={btn.handleClick}>{btn.title}</Button>
                    ))
                }
            </DialogActions>
        </Dialog>
    );
}
