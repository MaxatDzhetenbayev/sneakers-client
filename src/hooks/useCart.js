import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getCartProducts } from "../api/clothes";
export const useCart = () => {
  const user = useAuth();

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const handleGetUserCartItem = async () => {
      const cartItems = await getCartProducts(user?.uid);
		console.log(cartItems)
      setCartItems(cartItems);
    };

    handleGetUserCartItem();
  }, [user]);

  const totalPrice = cartItems?.reduce((sum, obj) => +obj.price + sum, 0);

  return { totalPrice };
};
