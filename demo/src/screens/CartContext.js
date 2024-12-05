import React, { createContext, useContext, useState } from 'react';

// Create a Cart Context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Function to add an item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    // Function to get the cart items
    const getCartItems = () => {
        return cartItems;
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the Cart Context
export const useCart = () => {
    return useContext(CartContext);
};