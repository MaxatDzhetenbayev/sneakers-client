import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import './App.css'
function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="wrapper clear">
      <Drawer opened={cartOpen} onClose={() => setCartOpen(false)} />
      <Header onOpen={() => setCartOpen(true)} />
      <Outlet />
    </div>
  );
}

export default App;
