import { createContext, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }, [cartItems]);
  //   console.log(cartItems);
  //   console.log(window.localStorage.getItem("cart-items"));
  const addItemToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeItemToCart = (id) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id != id));
  };

  const viewCartItemList = () => {
    const aggregatedItems = cartItems.reduce((acc, currentItem) => {
      if (acc[currentItem.id]) {
        acc[currentItem.id].count += 1;
      } else {
        acc[currentItem.id] = { ...currentItem, count: 1 };
      }
      return acc;
    }, {});

    const result = Object.values(aggregatedItems).map((item) => ({
      name: item.title,
      count: item.count,
    }));

    return result;
  };

  const sendOrder = (items, userInfo) => {
    console.log(items, userInfo);
    //  emailjs
    //    .send("service_okoza0b", "template_jw3f7uh", data, "myx63XfRfUvzWa19x")
    //    .then(
    //      (response) => {
    //        if (response.status == 200) {
    //          toast.success("Ваши заказ был принят. Ожидайте обратной связи!");
    //        }
    //        console.log("SUCCESS!", response.status, response.text);
    //      },
    //      (err) => {
    //        toast.error("Ошибка!");
    //        console.log("FAILED...", err);
    //      }
    //    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpened,
        setCartOpened,
        addItemToCart,
        removeItemToCart,
        sendOrder,
        viewCartItemList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
