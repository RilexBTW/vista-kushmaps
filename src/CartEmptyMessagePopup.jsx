import React from 'react';
import { Modal, Typography, Button } from '@mui/material';

const CartEmptyMessagePopup = ({ open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '16px', textAlign: 'center' }}>
                <Typography variant="h6">Your cart is empty.</Typography>
                <Button onClick={onClose} variant="outlined" style={{ marginTop: '16px' }}>Close</Button>
            </div>
        </Modal>
    );
};

export default CartEmptyMessagePopup;
