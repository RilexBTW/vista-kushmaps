import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="cart">
            <h3>Shopping Cart</h3>
            {cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
            ))}
            <div className="cart-total">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default Cart;
