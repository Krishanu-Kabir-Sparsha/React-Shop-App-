import { createContext, useState } from "react";


export const CartContext = createContext();


export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => { //addToCart is a handler. will be used in the product page

        setCart([...cart, product]); //... spread operator used to determine the past values
    };
    return (
    <CartContext.Provider value={{ cart, addToCart }}>
        {children}
    </CartContext.Provider>
    );
};