import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
function App() {
  const [cartOpen, setCartOpen] = useState(true);
  return (
    <div className="wrapper clear">
      <Drawer opened={cartOpen} />
      <Header onOpen={setCartOpen} />
      <Outlet />
    </div>
  );
}

export default App;
