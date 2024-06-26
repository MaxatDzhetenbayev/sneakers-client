import React, { useEffect, useState } from "react";
import Info from "../Info";
import styles from "./Drawer.module.scss";
import {
  addToOrder,
  fetchCartProducts,
  removeFromCart,
  addToCart,
} from "../../api/clothes";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { Counter } from "../Card/Counter/Counter";


const CartItemOptionsView = ({ obj, userId, onRemove, onAdd }) => {
  console.log(obj.id)
  return (
    <>
      <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {Object.keys(obj.options).map((key) => {
          return (
            <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }} key={key}>
              <span>Размер {key}</span>
              <Counter
                count={obj.options[key]?.count}
                onRemove={() => onRemove(userId, obj.id, key, false)}
                onAdd={() => onAdd(obj, userId, key)}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}


function Drawer({ onClose, opened }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [carts, setCarts] = useState([]);

  const user = useAuth();
  const userId = user?.uid;

  const { totalPrice } = useCart();

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = fetchCartProducts(userId, setCarts, setIsLoading);

    return () => unsubscribe();
  }, [userId]);

  const onClickOrder = async (user) => {
    try {
      addToOrder(user);
    } catch (error) { }
  };
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="img/btn-remove.svg"
            alt="Close"
          />
        </h2>
        {!user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <h3 style={{ textAlign: "center" }}>
              Авторизуйтесь, чтобы добавить товар в корзину
            </h3>
          </div>
        ) : isLoading ? (
          <div>Загрузка...</div>
        ) : carts.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {carts.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{
                      backgroundImage: `url(${obj.imageurl})`,
                    }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} тг.</b>
                    <CartItemOptionsView
                      obj={obj}
                      userId={userId}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                      // onRemove={() => removeFromCart(user.uid, obj.id, false)}
                    />
                  </div>
                  <img
                    onClick={() => removeFromCart(user.uid, obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  {/* total */}

                  <b>{totalPrice} тг. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={() => onClickOrder(user)}
                className="greenButton"
              >
                Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            onClose={onClose}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
