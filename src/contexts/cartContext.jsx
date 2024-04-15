import { createContext, useState } from "react";
import emailjs from "@emailjs/browser";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <CartContext.Provider
      value={{
        cartOpened,
        setCartOpened,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
