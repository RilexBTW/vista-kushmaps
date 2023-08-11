import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9998,
    },
}));

const CartBackdrop = ({ open, onClose }) => {
    const classes = useStyles();

    if (!open) {
        return null;
    }

    return <div className={classes.backdrop} onClick={onClose} />;
};

export default CartBackdrop;
