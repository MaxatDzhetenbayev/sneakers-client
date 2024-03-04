import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { AppContext } from "./context";

function App() {
  const {
    items: cartItems,
    cartOpened,
    onRemoveItem,
    setCartOpened,
  } = useContext(AppContext);
  return (
    <div className="wrapper clear">
      {/* <Drawer
        items={cartItems}
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveItem}
        opened={cartOpened}
      /> */}

      {/* <Header onClickCart={() => setCartOpened(true)} /> */}
      <Outlet />
    </div>
  );
}

export default App;
