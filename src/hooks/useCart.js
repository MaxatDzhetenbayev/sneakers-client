import React from "react";
import { CartContext } from "../contexts/cartContext";

export const useCart = () => {
  const { cartItems } = React.useContext(CartContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { totalPrice };
};
