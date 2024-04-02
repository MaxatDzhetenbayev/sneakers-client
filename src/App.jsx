import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { AppContext } from "./context";
import { CartContext } from "./contexts/cartContext";
function App() {
  const {
    removeItemToCart,
    cartItems,
    cartOpened,
    setCartOpened,
    onRemoveItem,
  } = useContext(CartContext);

  return (
    <div className="wrapper clear">
      {/* <Header /> */}
      <Drawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={removeItemToCart}
        opened={cartOpened}
      />
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
