import React from 'react';
import { Typography } from '@mui/material';

const EmptyCart = () => {
    return (
        <div className="empty-cart">
            <Typography variant="h5">Your cart is empty</Typography>
            <Typography>Start shopping and add items to your cart!</Typography>
        </div>
    );
};

export default EmptyCart;
