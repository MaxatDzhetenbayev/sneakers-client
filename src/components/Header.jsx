import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

function Header({ onOpen }) {
  const user = useAuth();
  const cart = useCart();
  const navigate = useNavigate();

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
        <li onClick={onOpen} className="mr-30 cu-p d-flex">
          <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
          <span>{cart?.totalPrice} тенге.</span>
        </li>
        <li>
          {user ? (
            <Link to="/profile">
              <img
                width={18}
                height={18}
                src="img/user.svg"
                alt="Пользователь"
              />
            </Link>
          ) : (
            <button onClick={() => navigate("login")}>Войти</button>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
