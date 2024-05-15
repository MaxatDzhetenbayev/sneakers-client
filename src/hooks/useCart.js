import React, { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { fetchCartProducts } from "../api/clothes";
export const useCart = () => {
  const user = useAuth();
  const userId = user?.uid;

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return

    fetchCartProducts(userId, setCartItems, setIsLoading);
  }, [userId]);
  // const totalPrice = cartItems?.reduce((sum, obj) => (+obj.price + sum) * +obj.count, 0);
  const totalPrice = cartItems?.reduce((sum, obj) => {
    const options = obj.options
    let totalItemPrice = 0
    for (const key in options) {

      totalItemPrice += options[key].count * obj.price
    }
    return totalItemPrice + sum
  }
    , 0);

  return { totalPrice };
};
