import React from 'react';
import { Typography, Button, Grid } from '@mui/material';

const Cart = ({ cartItems, onRemoveFromCart }) => {
    return (
        <div>
            <Typography variant="h5">Cart</Typography>
            {cartItems.map(item => (
                <Grid container key={item.id} alignItems="center">
                    <Grid item xs={6}>
                        <Typography>{item.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>${item.price}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => onRemoveFromCart(item.id)}
                        >
                            Remove
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </div>
    );
};

export default Cart;
