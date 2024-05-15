import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import './App.css'
import { Footer } from "./components/Footer/Footer";
function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="wrapper clear" style={{overflow: "hidden"}}>
      <Header onOpen={() => setCartOpen(true)} />
      <Outlet />
      <Footer/>
      <Drawer opened={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default App;
