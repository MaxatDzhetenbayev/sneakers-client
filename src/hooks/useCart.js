import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { fetchCartProducts } from "../api/clothes";
export const useCart = () => {
  const user = useAuth();
  const userId = user?.uid;

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
	if(!userId) return

    fetchCartProducts(userId, setCartItems, setIsLoading);
  }, [userId]);
//   console.log(cartItems)
  const totalPrice = cartItems?.reduce((sum, obj) => (+obj.price + sum) * +obj.count, 0);

  return { totalPrice };
};
