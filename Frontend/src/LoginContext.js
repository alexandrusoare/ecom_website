import React, { createContext, useContext, useState } from 'react';

const LoggedInContext = createContext();

export function LoggedInProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Add user ID state
  const [cartItems, setCartItems] = useState([]); 

   // Add addToCart function to the context
   const addToCart = (course, action) => {
    setCartItems([...cartItems, { course, action }]);
  };
  return (
    <LoggedInContext.Provider value={{ loggedIn, setLoggedIn, userId, setUserId, cartItems, setCartItems, addToCart }}>
      {children}
    </LoggedInContext.Provider>
  );
}

export function useLogin() {
  return useContext(LoggedInContext);
}
