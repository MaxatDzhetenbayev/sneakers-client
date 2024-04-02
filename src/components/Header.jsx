import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { CartContext } from "../contexts/cartContext";

function Header() {
  const { totalPrice } = useCart();
  const { setCartOpened } = useContext(CartContext);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          {/* <img width={40} height={40} src="img/logo.png" alt="Logotype" /> */}
          <div>
            <h3 className="text-uppercase">Omir ozen</h3>
            <p className="opacity-5">Магазин лучшей брендовой одежды</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={() => setCartOpened(true)} className="mr-30 cu-p d-flex">
          <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
          <span>{totalPrice} тенге.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="img/heart.svg" alt="Закладки" />
          </Link>
        </li>
        {/* <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
          </Link>
        </li> */}
      </ul>
    </header>
  );
}

export default Header;
